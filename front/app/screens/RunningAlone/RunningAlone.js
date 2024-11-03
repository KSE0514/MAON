import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { Bottom, RunInfo, StopBtn, Top, Wrapper } from "./RunningAloneStyle";
import { useState } from "react";
import Map from "../../components/Map/Map";
import RunStartModal from "../../components/Modal/RunStartModal/RunStartModal";
import Timer from "../../components/Timer/Timer";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
const RunningAlone = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();
  const [showStartModal, setShowStartModal] = useState(false);
  const [runStart, setRunStart] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const StopModalContent = {
    text: "종료하시겠습니까?",
    subText: "",
    buttons: [
      {
        title: "취소",
        onPress: () => {
          //타이머 재시작 버튼
          closeModal();
        },
      },
      {
        title: "종료",
        onPress: () => {
          // 결과이동
          closeModal();
        },
      },
    ],
  };
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  const handleTimeUpdate = (time) => {
    setElapsedTime(time); // Timer로부터 업데이트된 시간 받기
  };

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  return (
    <View style={{ flex: "1" }}>
      {runStart && (
        <Top>
          <StopBtn
            onPress={() => {
              //달리고있을 때 = 멈추기
              if (!showStopModal) {
                setShowStopModal(true);
              }
            }}>
            {runStart && !showStopModal && <FontAwesomeIcon icon={faPause} />}
            {runStart && showStopModal && <FontAwesomeIcon icon={faPlay} />}
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
      />

      {runStart && (
        <Bottom>
          <RunInfo></RunInfo>
        </Bottom>
      )}
      {showStartModal && (
        <RunStartModal
          showStartModal={showStartModal}
          setShowStartModal={setShowStartModal}
          setRunStart={setRunStart}
        />
      )}
      {showStopModal && (
        <DefaultModal isVisible={showStopModal} content={StopModalContent} />
      )}
    </View>
  );
};
export default RunningAlone;
