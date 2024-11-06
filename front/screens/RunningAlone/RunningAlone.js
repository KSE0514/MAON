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
import { useEffect, useState } from "react";
import Map from "../../components/Map/Map";
import RunStartModal from "../../components/Modal/RunStartModal/RunStartModal";
import Timer from "../../components/Timer/Timer";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import GoalDonutChart from "../../components/DonutChart/DonutChart";
import Pace from "../../components/Pace/Pace";
import HeartBeat from "../../components/HeartBeat/HeartBeat";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { RUN_API } from "@env";

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

  useEffect(() => {
    const locationDto = {
      latitude: 37.5665,
      longitude: 126.978,
      memberId: "",
      heartRate: 12345,
      pace: "pace",
      timestamp: new Date().getTime(),
    };

    // SockJS를 통해 STOMP 클라이언트 생성
    const socket = new SockJS(`${RUN_API}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str), // 디버그 로그 출력
      reconnectDelay: 5000, // 연결 재시도 시간
    });

    // 연결 및 메시지 전송
    stompClient.onConnect = () => {
      console.log("Connected");

      // 서버로 메시지 전송
      // stompClient.publish({
      //   destination: "/app/running/roomId",
      //   body: JSON.stringify(locationDto),
      // });
    };

    // 오류 처리
    stompClient.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    // STOMP 클라이언트 활성화
    stompClient.activate();

    return () => {
      stompClient.deactivate(); // 컴포넌트 언마운트 시 연결 해제
    };
  }, []);
  return (
    <View style={{ flex: "1" }}>
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
