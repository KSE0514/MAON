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

export const Button = styled(TouchableOpacity)`
  flex: 1;
`;
export const ButtonView = styled.View`
  flex-direction: row;
`;
export const Title = styled.Text``;
export const styles = StyleSheet.create({
  BoldFont: {
    fontFamily: fonts.gMarketBold,
  },
});
