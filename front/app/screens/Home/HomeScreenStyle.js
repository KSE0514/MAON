import styled from "styled-components/native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const ButtonList = styled.View`
  flex: 1;
`;
export const AloneRunBtn = styled(TouchableOpacity)``;
export const TogetherRunBtn = styled(TouchableOpacity)``;
export const FriendList = styled(TouchableOpacity)``;
export const MaraThonInfoArea = styled.View`
  flex: 1;
`;
