import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import color from "../../styles/colors";
import backImg from "./../../assets/images/Login_Back_cut2.jpg"
import { 
  Container,
  Logo,
  Wrap,
 } from "./LoginScreenStyles";
import { StyleSheet,View, Text, SafeAreaView, Image } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { Dimensions } from "react-native";

import RoundBtn from "../../components/Button/RoundBtn/RoundBtn";

const LoginScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  // 화면 크기에 따라 텍스트 크기 조정
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // const fontSize = screenWidth * 0.2; // 화면 너비의 20%로 글자 크기 설정

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  const checkUser = () => {
    console.log("가입한적 있으면 버튼도 안 보이고 바로 홈 화면으로")
    navigation.navigate("SignUp");
  }

  return (
    <Container>
      <View
      style={{
        width: '100%',
        height: screenHeight,
        zIndex: 2,
        position: "absolute",
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
      ></View>
      <Image 
        source={backImg}
        style={{
          position: "absolute",
          height: screenHeight,
        }}
      />
      <Wrap>
        <Logo>MA:ON</Logo>
        <RoundBtn text={"Google로 로그인"} onPress={checkUser} />
      </Wrap>
    </Container>
  );
};

// const styles = StyleSheet.create({
//   logo: {
    
//   }
// })

export default LoginScreen;
