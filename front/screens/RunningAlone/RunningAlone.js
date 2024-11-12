import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import {
  Bottom,
  RunInfo,
  RunInfoCol,
  StopBtn,
  Top,
  Wrapper,
} from "./RunningAloneStyle";
import { useEffect, useRef, useState } from "react";
import Map from "../../components/Map/Map";
import RunStartModal from "../../components/Modal/RunStartModal/RunStartModal";
import Timer from "../../components/Timer/Timer";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import GoalDonutChart from "../../components/DonutChart/GoalDonutChart";
import Pace from "../../components/Pace/Pace";
import HeartBeat from "../../components/HeartBeat/HeartBeat";
import { locationDtoPrint } from "../../utils/console";

const RunningAlone = ({ navigation, route }) => {
  const { roomId, mode } = route.params;
  const fontsLoaded = useFontsLoaded();

  const [showStartModal, setShowStartModal] = useState(false); // 시작 모달
  const [runStart, setRunStart] = useState(false); // 달리기 시작 / 멈춤
  const [showStopModal, setShowStopModal] = useState(false); // 종료 모달
  const [running, setRunning] = useState(false); // 달리기 진행 여부
  const [runningDistance, setRunningDistance] = useState(0); // 달린 거리
  const [elapsedTime, setElapsedTime] = useState("00:00:00"); // 경과 시간
  const [pace, setPace] = useState("00'00''"); // 페이스
  const [connectedWatch, setConnectedWatch] = useState(false); // 워치 연결 여부

  const elapsedTimeRef = useRef(elapsedTime);
  const paceRef = useRef(pace);
  const runningDistanceRef = useRef(runningDistance);

  const [resultData, setResultData] = useState({
    id: "",
    routeId: "",
    paceList: [],
    recordedTrack: "",
    runningTime: "",
    averagePace: "",
    averageHeartRate: 0,
    distance: 0,
    createdAt: "",
    routeDistance: 0,
    distanceList: [],
  });

  const StopModalContent = {
    text: "종료하시겠습니까?",
    subText: "",
    buttons: [
      {
        title: "취소",
        onPress: () => {
          setShowStopModal(false);
          setRunStart(true);
        },
      },
      {
        title: "종료",
        onPress: () => {
          setRunStart(false);
          setRunning(false);
          const sendEndSession = (recordId) => {
            console.log("End session request for recordId:", recordId);

            const sendFrame =
              `SEND\n` +
              `destination:/pub/running/${recordId}/end\n` +
              `content-type:application/json\n\n` +
              `{"status": "end"}\0`;

            if (
              kafkaStompClientRef.current &&
              kafkaStompClientRef.current.readyState === WebSocket.OPEN
            ) {
              kafkaStompClientRef.current.send(sendFrame);
              console.log(`End session message sent for recordId: ${recordId}`);
            } else {
              console.error("WebSocket connection is not open.");
            }
          };

          sendEndSession(roomId); // 종료 요청 전송
        },
      },
    ],
  };
  useEffect(() => {
    if (resultData.id) {
      navigation.navigate("RunResult", {
        resultData: resultData,
        mode: mode,
        recordId: roomId,
      });
    }
  }, [resultData]);

  const kafkaStompClientRef = useRef(null);

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  useEffect(() => {
    const kafkaWs = new WebSocket(
      "wss://k11c207.p.ssafy.io/maon/route/ws/location"
    );

    kafkaWs.onopen = () => {
      console.log("WebSocket 연결 성공!");

      // STOMP CONNECT 프레임 직접 전송
      const connectFrame =
        "CONNECT\naccept-version:1.2,1.1,1.0\nhost:k11c207.p.ssafy.io\n\n\0";
      kafkaWs.send(connectFrame);
    };

    kafkaWs.onmessage = (message) => {
      console.log("서버로부터 메시지 수신:", message.data);

      if (message.data.startsWith("CONNECTED")) {
        console.log("STOMP 연결 성공!");
        const subscribeFrame = `SUBSCRIBE\nid:sub-1\ndestination:/sub/running/${roomId}/end\n\n\0`;
        kafkaWs.send(subscribeFrame);
      } else {
        try {
          // JSON 형식만 추출하기
          const jsonStartIndex = message.data.indexOf("{");
          const jsonEndIndex = message.data.lastIndexOf("}");
          if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
            const jsonString = message.data.substring(
              jsonStartIndex,
              jsonEndIndex + 1
            );
            const parsedData = JSON.parse(jsonString); // JSON 부분만 파싱

            if (parsedData.status === "end") {
              console.log("종료 응답 수신:", JSON.stringify(parsedData));

              setResultData({
                id: parsedData.record.id,
                routeId: parsedData.record.routeId,
                paceList: parsedData.record.paceList,
                recordedTrack:
                  parsedData.record.recordedTrack.coordinates || [],
                runningTime: parsedData.record.runningTime,
                averagePace: parsedData.record.averagePace,
                averageHeartRate: parsedData.record.averageHeartRate,
                distance: parsedData.record.distance,
                createdAt: parsedData.record.createdAt,
                routeDistance: parsedData.routeDistance || 0,
                distanceList: [],
              });
            }
          } else {
            console.error("유효한 JSON 형식이 포함되지 않음.");
          }
        } catch (error) {
          console.error("메시지 파싱 오류:", error);
        }
      }
    };

    kafkaWs.onclose = () => {
      console.log("WebSocket 연결이 종료되었습니다.");
    };

    kafkaWs.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    kafkaStompClientRef.current = kafkaWs;

    // 워치에 연결된 경우 워치와의 웹소켓 열고 connectedWatch = true로 변경
    // 열린 웹 소켓으로 1초마다 값이 넘어오기에 이를 백엔드로 넘겨주면 됨.

    return () => {
      kafkaWs.close(); // 컴포넌트 언마운트 시 WebSocket 연결 해제
    };
  }, [roomId]);

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
    paceRef.current = pace;
    runningDistanceRef.current = runningDistance;
  }, [elapsedTime, pace, runningDistance]);

  // 위치가 변경될 때마다 서버로 위치와 페이스 정보 전송
  const handleUserLocationChange = (location) => {
    if (!connectedWatch) {
      const locationDto = {
        recordId: roomId,
        time: elapsedTimeRef.current,
        memberId: "현석",
        latitude: location.latitude,
        longitude: location.longitude,
        heartRate: 0,
        pace: paceRef.current == undefined ? 0 : paceRef.current, // 최신 페이스
        runningDistance: runningDistanceRef.current.toFixed(2),
      };
      locationDtoPrint(locationDto);
      if (
        kafkaStompClientRef.current &&
        kafkaStompClientRef.current.readyState === WebSocket.OPEN
      ) {
        // STOMP 프레임을 구성하여 데이터 전송
        const sendFrame =
          `SEND\n` +
          `destination:/pub/running/${roomId}\n` +
          `content-type:application/json\n\n` +
          `${JSON.stringify(locationDto)}\0`;

        kafkaStompClientRef.current.send(sendFrame);
      }
    }
  };

  const handleTimeUpdate = (time) => {
    console.log(time);
    setElapsedTime(time); // Timer로부터 업데이트된 시간 받기
  };

  return (
    <View style={{ flex: 1 }}>
      {running && (
        <Top>
          <StopBtn
            onPress={() => {
              if (!showStopModal) {
                setShowStopModal(true);
                setRunStart(false);
              }
            }}>
            {!showStopModal && (
              <FontAwesomeIcon icon={faPause} color="white" size={25} />
            )}
            {showStopModal && (
              <FontAwesomeIcon icon={faPlay} color="white" size={25} />
            )}
          </StopBtn>
          <Timer
            showStopModal={showStopModal}
            runStart={runStart}
            onTimeUpdate={handleTimeUpdate}
          />
        </Top>
      )}
      <Map
        showStartModal={showStartModal}
        setShowStartModal={setShowStartModal}
        navigation={navigation}
        runStart={runStart}
        setRunningDistance={setRunningDistance}
        mode={mode}
        onLocationChange={handleUserLocationChange}
      />
      {running && (
        <Bottom>
          <RunInfo>
            <RunInfoCol style={{ flex: 1 }}>
              <GoalDonutChart
                currentDistance={parseFloat(runningDistance)}
                goalDistance={0}
                mode={mode}
              />
            </RunInfoCol>
            <RunInfoCol style={{ flex: 2, paddingLeft: 21 }}>
              <Pace
                mode={mode}
                elapsedTime={elapsedTime}
                currentDistance={runningDistance}
                setPace={setPace}
                pace={pace}
              />
              <HeartBeat mode={mode} />
            </RunInfoCol>
          </RunInfo>
        </Bottom>
      )}
      {showStartModal && (
        <RunStartModal
          showStartModal={showStartModal}
          setShowStartModal={setShowStartModal}
          setRunStart={setRunStart}
          setRunning={setRunning}
        />
      )}
      {showStopModal && (
        <DefaultModal isVisible={showStopModal} content={StopModalContent} />
      )}
    </View>
  );
};

export default RunningAlone;
