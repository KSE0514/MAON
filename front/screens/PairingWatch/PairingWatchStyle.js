import styled from "styled-components/native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import color from "../../styles/colors";

export const Button = styled(TouchableOpacity)`
  flex: 1;
  background-color: ${color.mandarin};
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 30px;
`;
export const ButtonView = styled.View`
  flex-direction: row;
`;
export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 30px;
`;
export const styles = StyleSheet.create({
  BoldFont: {
    fontFamily: fonts.gMarketBold,
  },
  buttonText: {
    color: "white",
    fontFamily: fonts.gMarketMedium,
    fontSize: 16,
  },
});
