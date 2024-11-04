import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import styled from "styled-components";
export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.light_begie};
`;

export const StopBtn = styled.TouchableOpacity``;
export const RunInfo = styled.View``;
export const Top = styled.View`
  position: absolute;
  z-index: 20;
  top: 10%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const Bottom = styled.View``;
