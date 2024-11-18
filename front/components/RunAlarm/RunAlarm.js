import { StyleSheet, View, TextInput, Text } from "react-native";
import { useState } from "react";
import Svg, { Path } from "react-native-svg";
import color from "../../styles/colors";
import { ModalContainer, ModalContent } from "./RunAlarmStyle";
import fonts from "../../styles/fonts";

const RunAlarm = ({ ment, isVisible }) => {
  if (!isVisible) return null;
  return (
    <ModalContainer style={styles.container}>
      <ModalContent style={styles.textBox}>
        <Text style={styles.text}>{ment}</Text>
      </ModalContent>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  textBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.gMarketBold,
    fontSize: 20,
    lineHeight: 28, // 줄 높이 추가 (폰트 크기의 1.4배 정도 추천)
  },
});

export default RunAlarm;
