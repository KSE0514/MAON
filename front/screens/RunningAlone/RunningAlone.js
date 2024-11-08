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
import GoalDonutChart from "../../components/DonutChart/DonutChart";
import Pace from "../../components/Pace/Pace";
import HeartBeat from "../../components/HeartBeat/HeartBeat";

const RunningAlone = ({ navigation, route }) => {
  const { roomId } = route.params;
  const fontsLoaded = useFontsLoaded();

  // Modal and State Management
  const [showStartModal, setShowStartModal] = useState(false);
  const [runStart, setRunStart] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [running, setRunning] = useState(false);
  const [runningDistance, setRunningDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [pace, setPace] = useState("");

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
          navigation.navigate("RunResult");
        },
      },
    ],
  };

  const stompClientRef = useRef(null);

  const handleTimeUpdate = (time) => {
    setElapsedTime(time); // Timer로부터 업데이트된 시간 받기
  };

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  useEffect(() => {
    const ws = new WebSocket("wss://k11c207.p.ssafy.io/maon/route/ws/location");

    ws.onopen = () => {
      console.log("WebSocket 연결 성공!");

      // STOMP CONNECT 프레임 직접 전송
      const connectFrame =
        "CONNECT\naccept-version:1.2,1.1,1.0\nhost:k11c207.p.ssafy.io\n\n\0";
      ws.send(connectFrame);
    };

    ws.onmessage = (message) => {
      console.log("서버로부터 메시지 수신:", message.data);

      if (message.data.startsWith("CONNECTED")) {
        console.log("STOMP 연결 성공!");

        // STOMP SUBSCRIBE 프레임
        const subscribeFrame = `SUBSCRIBE\nid:sub-0\ndestination:/sub/running/${roomId}\n\n\0`;
        ws.send(subscribeFrame);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket 연결이 종료되었습니다.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    stompClientRef.current = ws;

    return () => {
      ws.close(); // 컴포넌트 언마운트 시 WebSocket 연결 해제
    };
  }, [roomId]);

  // 위치가 변경될 때마다 서버로 위치와 페이스 정보 전송
  const handleUserLocationChange = (location) => {
    const locationDto = {
      latitude: location.latitude,
      longitude: location.longitude,
      pace, // 최신 페이스
      timestamp: elapsedTime, // 최신 경과 시간
      memberId: "dpqls3056",
      heartRate: 0,
    };
    console.log(
      "latitude: ",
      locationDto.latitude,
      " longitude:",
      locationDto.longitude,
      " pace:",
      locationDto.pace,
      " timestamp:",
      locationDto.timestamp,
      " memberId:",
      locationDto.memberId,
      " heartRate:",
      locationDto.heartRate
    );
    if (
      stompClientRef.current &&
      stompClientRef.current.readyState === WebSocket.OPEN
    ) {
      const sendFrame = `SEND\ndestination:/pub/running/${roomId}\n\n${JSON.stringify(
        locationDto
      )}\0`;
      stompClientRef.current.send(sendFrame);
    }
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
            }}
          >
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
        mode={"aloneRun"}
        onLocationChange={handleUserLocationChange}
      />
      {running && (
        <Bottom>
          <RunInfo>
            <RunInfoCol style={{ flex: 1 }}>
              <GoalDonutChart
                currentDistance={parseFloat(
                  (runningDistance / 1000).toFixed(2)
                )}
                goalDistance={0}
                mode={"aloneRun"}
              />
            </RunInfoCol>
            <RunInfoCol style={{ flex: 2, paddingLeft: 21 }}>
              <Pace
                mode={"aloneRun"}
                elapsedTime={elapsedTime}
                currentDistance={(runningDistance / 1000).toFixed(2)}
                setPace={setPace}
                pace={pace}
              />
              <HeartBeat mode={"aloneRun"} />
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
