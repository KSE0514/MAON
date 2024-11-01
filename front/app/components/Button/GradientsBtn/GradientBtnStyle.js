import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import fonts from "../../../styles/fonts";
import colors from "../../../styles/colors";
import styled from "styled-components";
export const ButtonContainer = styled(TouchableOpacity)`
  flex: ${({ mode }) => (mode == "together" ? "1.5" : "1")};
`;
export const GradientBtn = styled(LinearGradient)`
  flex: 1;
  padding: 15px;
  border-radius: 14px;
  margin-bottom: ${({ mode }) => (mode == "together" ? "15px" : "0px")};
`;
export const ButtonText = styled.Text`
  font-family: ${fonts.gMarketBold};
  color: ${colors.white};
  text-align: ${({ mode }) => (mode == "together" ? "right" : "start")};
`;
