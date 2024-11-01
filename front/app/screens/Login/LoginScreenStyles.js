import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import color from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Text, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";

// 화면 크기에 따라 텍스트 크기 조정
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Text`
  flex: 1;
  font-family: ${fonts.gMarketBold};
`;
