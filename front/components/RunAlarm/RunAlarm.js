import { StyleSheet, View, TextInput, Text } from "react-native";
import { useState } from "react";
import Svg, { Path } from "react-native-svg";
import color from "../../styles/colors";

const RunAlarm = ({ ment }) => {
  return (
    <View style={styles.container}>
      <Text>{ment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default RunAlarm;
