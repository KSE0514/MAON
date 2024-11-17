import { StyleSheet, View, TextInput, Text } from "react-native";
import { useState } from "react";
import Svg, { Path } from "react-native-svg";
import color from "../../styles/colors";
import { ModalContainer, ModalContent } from "./RunAlarmStyle";

const RunAlarm = ({ ment, isVisible }) => {
  if (!isVisible) return null;
  return (
    <ModalContainer style={styles.container}>
      <ModalContent style={styles.box}>
        <Text>{ment}</Text>
      </ModalContent>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({});

export default RunAlarm;
