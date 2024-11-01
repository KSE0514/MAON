import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import fonts from "../../../styles/fonts";
import colors from "../../../styles/colors";

// 그라데이션 스타일별 색상 배열
const gradients = {
  orange_gradient: ["rgba(255, 116, 14, 0.88)", "rgba(255, 166, 70, 0.88)"],
  grape_fruit_gradient: ["#FE7A58", "#FA9987"],
  mandarin_gradient: ["#FFB727", "#FDD048"],
  balck_gradient: ["#5E584F", "#5E584F"],
};

// 방향별 시작과 끝 좌표 설정
const directions = {
  topToBottom: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  leftToRight: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  diagonalTopLeftToBottomRight: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  diagonalTopRightToBottomLeft: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
};

const fontStyle = {
  alone: { fontSize: 40, lineHeight: 50 },
  together: { fontSize: 32, lineHeight: 42 },
  friend: { fontSize: 20, lineHeight: 30 },
};
const GradientButton = ({
  onPress,
  title,
  gradientType,
  direction = "topToBottom",
  mode,
}) => {
  const { start, end } = directions[direction];

  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer]}>
      <LinearGradient
        colors={gradients[gradientType] || gradients.orange_gradient}
        start={start}
        end={end}
        style={[
          styles.gradient,
          mode == "alone"
            ? styles.alone
            : mode == "together"
            ? styles.together
            : styles.friend,
        ]}
      >
        <Text style={[styles.buttonText, fontStyle[mode]]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,

    paddingHorizontal: "10%",
    paddingVertical: "10%",
    borderRadius: 14,
  },
  buttonText: {
    fontFamily: fonts.gMarketBold,
    color: colors.white,
  },
  alone: {},
  together: {},
  friend: {},
});

export default GradientButton;
