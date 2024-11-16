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
import useAuthStore from "../../store/AuthStore";
import { fetchPairedWatch } from "../../utils/checkPairedWatch";
import { getPracticeRoomId } from "../../utils/getRoomId";
import PairingWatch from "../PairingWatch/PairingWatch";

const RunningAlone = ({ navigation, route }) => {
  const fontsLoaded = useFontsLoaded();
  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  const { user } = useAuthStore();
  const { mode } = route.params;

  const [showStartModal, setShowStartModal] = useState(false); // 시작 모달
  const [runStart, setRunStart] = useState(false); // 달리기 시작 / 멈춤
  const [showStopModal, setShowStopModal] = useState(false); // 종료 모달
  const [running, setRunning] = useState(false); // 달리기 진행 여부
  const [runningDistance, setRunningDistance] = useState(0); // 달린 거리
  const [elapsedTime, setElapsedTime] = useState("00:00:00"); // 경과 시간
  const [pace, setPace] = useState("00'00''"); // 페이스
  const [connectedWatch, setConnectedWatch] = useState(false); // 워치 연결 여부
  const [recordId, setRecordId] = useState();

  const kafkaStompClientRef = useRef(null);
  const elapsedTimeRef = useRef(elapsedTime);
  const paceRef = useRef(pace);
  const runningDistanceRef = useRef(runningDistance);
  const recordIdRef = useRef(null);

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

  //종료 버튼
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
          console.log("종료버튼 누름");
          setRunStart(false);
          setRunning(false);
          const sendEndSession = (recordId) => {
            console.log("End session request for recordId:", recordId);

            const sendFrame =
              `SEND\n` +
              `destination:/pub/running/${recordId}/end\n` +
              `content-type:application/json\n\n\0`;

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

          sendEndSession(recordId); // 종료 요청 전송
        },
      },
    ],
  };

  // 위치가 변경될 때마다 서버로 위치와 페이스 정보 전송
  const handleUserLocationChange = (location) => {
    //워치가 없을때만 가능하다는거임
    if (!connectedWatch) {
      console.log("recordId: ", recordIdRef.current);
      const locationDto = {
        recordId: recordIdRef.current,
        time: elapsedTimeRef.current,
        memberId: user.id,
        latitude: location.latitude,
        longitude: location.longitude,
        heartRate: 0,
        pace: paceRef.current == undefined ? 0 : paceRef.current, // 최신 페이스
        // pace: "10'10\"", // 최신 페이스
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
          `destination:/pub/running/${recordId}\n` +
          `content-type:application/json\n\n` +
          `${JSON.stringify(locationDto)}\0`;

        kafkaStompClientRef.current.send(sendFrame);
      }
    }
  };

  //시간 데이터 업데이트
  const handleTimeUpdate = (time) => {
    console.log(time);
    setElapsedTime(time); // Timer로부터 업데이트된 시간 받기
  };

  //연동 여부 가져오기
  useEffect(() => {
    setConnectedWatch(fetchPairedWatch());
    // setConnectedWatch(false);
  }, []);

  //달리기 시작을 늘렀을 경우
  useEffect(() => {
    if (running) {
      const getRoomId = async () => {
        try {
          const responseRecordId = await getPracticeRoomId(
            user.id,
            user.accessToken
          );
          console.log("get recordId 함수 실행 결과", responseRecordId);
          recordIdRef.current = responseRecordId; // 최신 값 저장
          setRecordId(responseRecordId);
        } catch (error) {
          console.error("Error fetching room ID:", error);
        }
      };

      getRoomId(); // 비동기 함수 호출
    }
  }, [running]);

  useEffect(() => {
    if (recordIdRef.current) {
      console.log("가져온 recordId: ", recordIdRef.current);

      //웹소켓 연결
      const kafkaWs = new WebSocket(
        "wss://k11c207.p.ssafy.io/maon/route/ws/location"
      );

      kafkaWs.onopen = () => {
        console.log("WebSocket 연결 성공!");

        // 웹소켓이 열렸을 때 STOMP CONNECT 프레임 직접 전송
        const connectFrame =
          "CONNECT\naccept-version:1.2,1.1,1.0\nhost:k11c207.p.ssafy.io\n\n";
        kafkaWs.send(connectFrame);
      };

      //워치가 연동되었을 때
      if (connectedWatch) {
        console.log("워치 연동된 상태로 달리기");

        kafkaWs.onmessage = (message) => {
          console.log("서버로부터 메시지 수신:", message.data);

          //연결 응답이 올 경우 console.log에 찍기
          if (message.data.startsWith("CONNECTED")) {
            console.log("STOMP 연결 성공!");
            console.log(message.data);
            console.log("===========================================");
            //워치와 연결된 웹 소켓으로 recordId, mode, routeID를 전달

            const payload = {
              routeId: "",
              mode: mode,
              recordId: recordId,
            };

            // STOMP SEND 프레임 작성
            const sendFrame =
              `SEND\n` +
              `destination:/pub/start/${user.id}\n` + // pub으로 수정
              `content-type:application/json\n\n` +
              `${JSON.stringify(payload)}\0`;

            // WebSocket으로 전송
            kafkaWs.send(sendFrame);

            //stomp에 연결된 경우 데이터를 받을 sub을 구독하고있기
            const getDataSubscribeFrame = `SUBSCRIBE\nid:sub-running-${recordIdRef.current}\ndestination:/sub/running/${recordIdRef.current}\n\n\0`;
            kafkaWs.send(getDataSubscribeFrame);
            console.log("데이터 받을 곳 구독하기");

            //stomp에 연결된 경우 종료 sub 구독하고 있기
            const endSubscribeFrame = `SUBSCRIBE\nid:sub-end-${recordIdRef.current}\ndestination:/sub/running/${recordIdRef.current}/end\n\n\0`;
            kafkaWs.send(endSubscribeFrame);
            console.log("종료 데이터 받을 곳 구독하기");
          }
          //연결 종료에 대한 응답값
          else {
            try {
              const parsedMessage = message.data.trim(); // 메시지 데이터를 정리
              console.log("Received message:", parsedMessage);

              // 메시지에서 destination을 추출 (메시지 포맷에 맞게 처리)
              const destinationMatch =
                parsedMessage.match(/destination:(.*)\n/);
              if (!destinationMatch) {
                console.warn("No destination found in the message");
                return;
              }

              const destination = destinationMatch[1]; // destination 값 추출
              console.log("Destination:", destination);

              // destination 값에 따라 다른 로직 실행
              if (destination.endsWith("/end")) {
                console.log("Handling /end destination logic");
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
                      console.log(
                        "종료 응답 수신:",
                        JSON.stringify(parsedData)
                      );

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
                        distanceList: parsedData.record.distanceList,
                      });
                    }
                  } else {
                    console.error("유효한 JSON 형식이 포함되지 않음.");
                  }
                } catch (error) {
                  console.error("메시지 파싱 오류:", error);
                }
              }
              //러닝 데이터 받음
              else {
                console.log("handle runningData");
                // JSON 형식만 추출하기
                const jsonStartIndex = message.data.indexOf("{");
                const jsonEndIndex = message.data.lastIndexOf("}");
                if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
                  const jsonString = message.data.substring(
                    jsonStartIndex,
                    jsonEndIndex + 1
                  );
                  const parsedData = JSON.parse(jsonString); // JSON 부분만 파싱

                  console.log(
                    "워치 데이터 응답 수신:",
                    JSON.stringify(parsedData)
                  );
                }
              }
            } catch (error) {
              console.error("Error processing message:", error);
            }
          }
          //받은 데이터에 대한 세팅
        };
      }
      // 워치 연동이 안되었을 때
      else {
        console.log("워치 연동 안된 상태로 달리기");

        kafkaWs.onmessage = (message) => {
          console.log("서버로부터 메시지 수신:", message.data);

          //연결 응답이 올 경우 console.log에 찍기
          if (message.data.startsWith("CONNECTED")) {
            console.log("STOMP 연결 성공!");

            //stomp에 연결된 경우 종료 sub 구독하고 있기
            const subscribeFrame = `SUBSCRIBE\nid:sub-1\ndestination:/sub/running/${recordIdRef.current}/end\n\n\0`;
            kafkaWs.send(subscribeFrame);
          } else {
            try {
              const parsedMessage = message.data.trim(); // 메시지 데이터를 정리
              console.log("Received message:", parsedMessage);

              // 메시지에서 destination을 추출 (메시지 포맷에 맞게 처리)
              const destinationMatch =
                parsedMessage.match(/destination:(.*)\n/);
              if (!destinationMatch) {
                console.warn("No destination found in the message");
                return;
              }

              const destination = destinationMatch[1]; // destination 값 추출
              console.log("Destination:", destination);

              // destination 값에 따라 다른 로직 실행
              if (destination.endsWith("/end")) {
                console.log("Handling /end destination logic");
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
                      console.log(
                        "종료 응답 수신:",
                        JSON.stringify(parsedData)
                      );

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
                        distanceList: parsedData.record.distanceList,
                      });
                    }
                  } else {
                    console.error("유효한 JSON 형식이 포함되지 않음.");
                  }
                } catch (error) {
                  console.error("메시지 파싱 오류:", error);
                }
              } else {
                console.log("Unknown destination, handling default case");
                // 기타 처리 로직
              }
            } catch (error) {
              console.error("Error processing message:", error);
            }
          }
        };
      }
      kafkaWs.onclose = () => {
        console.log("WebSocket 연결이 종료되었습니다.");
      };

      kafkaWs.onerror = (error) => {
        console.error("WebSocket 오류:", error);
      };

      kafkaStompClientRef.current = kafkaWs;

      return () => {
        kafkaWs.close(); // 컴포넌트 언마운트 시 WebSocket 연결 해제
      };
    }
  }, [recordIdRef.current]);

  //결과 데이터가 변경이 되면 종료를 의미하기에 종료페이지로 이동
  useEffect(() => {
    if (resultData.id) {
      navigation.navigate("RunResult", {
        resultData: resultData,
        mode: mode,
        recordId: recordIdRef.current,
      });
    }
  }, [resultData]);

  //바뀐 측정값 바로 적용시켜주기
  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
    paceRef.current = pace;
    runningDistanceRef.current = runningDistance;
  }, [elapsedTime, pace, runningDistance]);

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
            elapsedTime={elapsedTime}
            connectedWatch={connectedWatch}
            showStopModal={showStopModal}
            runStart={runStart}
            onTimeUpdate={setElapsedTime}
          />
        </Top>
      )}
      <Map
        connectedWatch={connectedWatch}
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
                connectedWatch={connectedWatch}
                currentDistance={parseFloat(runningDistanceRef.current)}
                goalDistance={0}
                mode={mode}
              />
            </RunInfoCol>
            <RunInfoCol style={{ flex: 2, paddingLeft: 21 }}>
              <Pace
                connectedWatch={connectedWatch}
                mode={mode}
                elapsedTime={elapsedTime}
                currentDistance={runningDistanceRef}
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
