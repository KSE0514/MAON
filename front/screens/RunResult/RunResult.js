import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { useState } from "react";
const RunResult = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  return (
    <View style={{ flex: "1" }}>
      <Text>run result</Text>
    </View>
  );
};
export default RunResult;
