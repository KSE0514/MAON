import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { ModalContainer } from "../DefaultModal/DefaultModalStyles";
import { useFontsLoaded } from "../../../utils/fontContext";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
const RunStartModal = ({ showStartModal, setShowStartModal, setRunStart }) => {
  if (!showStartModal) return null;
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <ModalContainer>
      <TouchableOpacity
        onPress={() => {
          setShowStartModal(false);
          setRunStart(true);
        }}
        style={styles.base}>
        <View style={[styles.whiteBorder]}>
          <Text style={styles.whiteFont}>{`탭하여\n시작하기`}</Text>
        </View>
      </TouchableOpacity>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "65%", // 화면의 50% 너비
    aspectRatio: 1, // width와 height를 동일하게 유지하여 원형을 만듦
    borderRadius: 9999, // 원형으로 만듦
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_orange, // 표현식 없이 직접 사용
  },
  whiteBorder: {
    borderWidth: 5, // 두께 설정
    borderColor: colors.white, // 색상 설정
    width: "90%", // 화면의 50% 너비
    aspectRatio: 1, // width와 height를 동일하게 유지하여 원형을 만듦
    borderRadius: 9999, // 원형으로 만듦
    alignItems: "center",
    justifyContent: "center",
  },
  whiteFont: {
    textAlign: "center",
    lineHeight: 45,
    fontFamily: fonts.gMarketMedium,
    fontSize: 35,
    color: colors.white,
  },
});
export default RunStartModal;
