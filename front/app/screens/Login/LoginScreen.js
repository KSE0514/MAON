import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import color from "../../styles/colors";
import { 
  Container,
  Logo,
 } from "./LoginScreenStyles";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { Dimensions } from "react-native";

const LoginScreen = () => {
  const fontsLoaded = useFontsLoaded();

  // 화면 크기에 따라 텍스트 크기 조정
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // const fontSize = screenWidth * 0.2; // 화면 너비의 20%로 글자 크기 설정

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  return (
    <Container>
      <MaskedView
      style={{width: screenWidth, height: screenHeight}}
        maskElement={
          <Logo>MA:ON</Logo> // 텍스트를 마스킹 요소로 설정
        }
      >
        {/* <Text>assdkgljsdgkjla;</Text> */}
        <LinearGradient
          colors={[color.nav_orange, color.dark_mandarind]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </Container>
  );
};

// const styles = StyleSheet.create({
//   logo: {
    
//   }
// })

export default LoginScreen;
