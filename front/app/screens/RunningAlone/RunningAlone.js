import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import MarathonInfoSearchBar from "../../components/MarathonInfoSearchBar/MarathonInfoSearchBar";
import { useFontsLoaded } from "../../utils/fontContext";
import { Wrapper } from "./RunningAloneStyle";
import Map from "../../components/Map/Map";
import { useState } from "react";
import RunStartModal from "../../components/Modal/RunStartModal/RunStartModal";

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
  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  return (
    <View style={{ flex: "1" }}>
      {runStart && (
        <View>
          <StopBtn></StopBtn>
          <Timer />
        </View>
      )}
      <Map
        showStartModal={showStartModal}
        setShowStartModal={setShowStartModal}
        navigation={navigation}
        runStart={runStart}
      />

      {runStart && <RunInfo></RunInfo>}
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
