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
export const Wrapper = styled.View`
  padding: 20px 20px;
`;
export const Col = styled.View``;
export const Row = styled.View`
  flex-direction: row;
  margin-bottom: 10;
`;

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.gMarketMedgium,
    fontSize: 20,
    marginBottom: 12,
  },
  subText: {
    fontFamily: fonts.gMarketLight,
    fontSize: 14,
  },
});
