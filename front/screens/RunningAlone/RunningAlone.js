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
import { useEffect, useState, useRef, useCallback } from "react";
import Map from "../../components/Map/Map";
import RunStartModal from "../../components/Modal/RunStartModal/RunStartModal";
import Timer from "../../components/Timer/Timer";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import GoalDonutChart from "../../components/DonutChart/DonutChart";
import Pace from "../../components/Pace/Pace";
import HeartBeat from "../../components/HeartBeat/HeartBeat";
import SockJS from "sockjs-client";
// import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";
import { RUN_API } from "@env"; // ngrok 주소를 환경 변수로 관리

const RunningAlone = ({ navigation, route }) => {
  const { roomId } = route.params;
  const fontsLoaded = useFontsLoaded();
  //시작버튼
  const [showStartModal, setShowStartModal] = useState(false);
  //뛰기 시작 / 중단
  const [runStart, setRunStart] = useState(false);
  //종료 여부 모달
  const [showStopModal, setShowStopModal] = useState(false);
  //러닝중 판단
  const [running, setRunning] = useState(false);
  //달린거리
  const [runningDistance, setRunningDistance] = useState(0);
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
  //달린 시간
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  //달리기 모드
  const mode = "aloneRun";
  //pace
  const [pace, setPace] = useState("");

  const handleTimeUpdate = (time) => {
    setElapsedTime(time); // Timer로부터 업데이트된 시간 받기
  };

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  /** Stomp 연결 작성 */
  // wss://j11c201.p.ssafy.io/api/moapay/core/ws/dutchpay
  const locationDto = {
    latitude: 37.5665,
    longitude: 126.978,
    memberId: "adfasdf",
    heartRate: 12345,
    pace: "pace",
    timestamp: new Date().getTime(),
  };

  const stompConfig = {
    connectHeaders: {
      login: "guest",
      passcode: "guest",
    },
    brokerURL: "ws://k11c207.p.ssafy/ws",
    debug: function (str) {
      console.log("STOMP: " + str);
    },
    // If disconnected, it will retry after 200ms
    reconnectDelay: 200,
    // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
    onConnect: function (frame) {
      const subscription = stompClient.subscribe(
        "/sub/handshake",
        function (message) {
          console.log(message);
        }
      );
    },
  };

  stompClient = new Client(stompConfig);
  stompClient.activate();
  function sendLocation() {
    // trying to publish a message when the broker is not connected will throw an exception
    if (!stompClient.connected) {
      console.log("Broker disconnected, can't send message.");
      return false;
    }
    stompClient.publish({
      destination: `/pub/running/${roomId}`,
      body: JSON.stringify(payLoad),
    });
    return true;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("@@");
      if (stompClient.current.connected) {
        sendLocation(); // 0.9초마다 위치 정보 전송
      }
    }, 900); // 900ms = 0.9초

    return () => {
      clearInterval(intervalId);
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      }
    };
  }, []);

  // const stompClient = useRef(null);
  // const connectHandler = useCallback(() => {
  //   stompClient.current = Stomp.over(() => {
  //     const sock = new SockJS("https://k11c201.p.ssafy.io/ws/location"); // Gateway에 맞게 URL 수정
  //     return sock;
  //   });

  //   stompClient.current.over(
  //     {},
  //     (frame) => {
  //       console.log("WebSocket connected: " + frame);
  //       stompClient.current.send(
  //         `/app/running/${roomId}`,
  //         {},
  //         JSON.stringify(locationDto)
  //       );
  //     },
  //     (error) => {
  //       console.error("WebSocket 초기 연결 실패 " + error);
  //     }
  //   );
  // }, [roomId]);

  // const sendLocation = useCallback(() => {
  //   if (stompClient.current.connected) {
  //     console.log("WebSocket connected, sending location data...");
  //     stompClient.current.send(
  //       `/app/running/${roomId}`,
  //       {},
  //       JSON.stringify(locationDto)
  //     );
  //   } else {
  //     console.log("WebSocket is not connected yet");
  //   }
  // }, [roomId]);

  // useEffect(() => {
  //   connectHandler(); // 최초 연결 시 connectHandler 호출

  //   const intervalId = setInterval(() => {
  //     console.log("@@");
  //     if (stompClient.current.connected) {
  //       sendLocation(); // 0.9초마다 위치 정보 전송
  //     }
  //   }, 900); // 900ms = 0.9초

  //   return () => {
  //     clearInterval(intervalId);
  //     if (stompClient.current && stompClient.current.connected) {
  //       stompClient.current.disconnect(() => {
  //         console.log("WebSocket disconnected");
  //       });
  //     }
  //   };
  // }, []);

  //   // SockJS를 통해 STOMP 클라이언트 생성
  //   //const socket = new SockJS(`https://k11c207.p.ssafy.io/maon/ws`); // 예: "https://58bf-121-178-98-37.ngrok-free.app/ws"
  //   const stompClient = new Client({
  //     brokerURL: "wss://k11c207.p.ssafy.io/maon/ws",
  //     //new WebSocket("https://k11c207.p.ssafy.io/maon/ws"), // wss://로 수정
  //     debug: (str) => console.log("STOMP Debug:", str), // 모든 디버그 메시지 출력
  //   });

  //   stompClient.onConnect = () => {
  //     console.log("Connected to STOMP WebSocket");
  //     alert("wow connected!");
  //     stompClient.publish({
  //       destination: `/app/running/${roomId}`, // 정확한 경로로 설정
  //       body: JSON.stringify(locationDto),
  //     });
  //   };

  //   stompClient.onWebSocketError = (error) => {
  //     console.error("WebSocket connection error:", error);
  //   };

  //   stompClient.onDisconnect = () => {
  //     console.log("Disconnected from WebSocket");
  //   };

  //   // 오류 처리
  //   stompClient.onStompError = (frame) => {
  //     console.error("STOMP error:", frame);
  //   };

  //   // STOMP 클라이언트 활성화
  //   stompClient.activate();

  //   return () => {
  //     stompClient.deactivate(); // 컴포넌트 언마운트 시 연결 해제
  //   };
  // }, []);

  // 위치가 변경될 때마다 서버로 위치와 페이스 정보 전송
  const handleUserLocationChange = (location) => {
    // const locationDto = {
    //   latitude: location.latitude,
    //   longitude: location.longitude,
    //   pace, // 최신 페이스
    //   timestamp: elapsedTime, // 최신 경과 시간
    //   // distance: runningDistance, //달린 거리
    //   memberId: "dpqls3056",
    //   heartRate: 0,
    // };
    // console.log(
    //   "latitude: ",
    //   locationDto.latitude,
    //   " longitude:",
    //   locationDto.longitude,
    //   " pace:",
    //   locationDto.pace,
    //   " timestamp:",
    //   locationDto.timestamp,
    //   " memberId:",
    //   locationDto.memberId,
    //   " heartRate:",
    //   locationDto.heartRate
    // );
    // if (stompClientRef.current && stompClientRef.current.connected) {
    //   const locationDto = {
    //     latitude: location.latitude,
    //     longitude: location.longitude,
    //     pace, // 최신 페이스
    //     timestamp: elapsedTime, // 최신 경과 시간
    //     // distance: runningDistance, //달린 거리
    //     memberId: "dpqls3056",
    //     heartRate: 0,
    //   };
    //   stompClientRef.current.publish({
    //     destination: `/app/running/${roomId}`,
    //     body: JSON.stringify(locationDto),
    //   });
    // }
  };

  return (
    <View style={{ flex: 1 }}>
      {running && (
        <Top>
          <StopBtn
            onPress={() => {
              //달리고있을 때 = 멈추기
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
        mode={mode}
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
                mode={mode}
              />
            </RunInfoCol>
            <RunInfoCol style={{ flex: 2, paddingLeft: 21 }}>
              <Pace
                mode={mode}
                elapsedTime={elapsedTime}
                currentDistance={(runningDistance / 1000).toFixed(2)}
                setPace={setPace}
                pace={pace}
              />
              <HeartBeat mode={mode} />
            </RunInfoCol>
          </RunInfo>
        </Bottom>
      )}
      {/* step1 . 시작버튼 누르면 소켓 열기 */}
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
