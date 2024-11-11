import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Linking from 'expo-linking';
import { Container, Logo, Wrap } from "./LoginScreenStyles";
import backImg from "./../../assets/images/Login_Back_cut2.jpg";
import RoundBtn from "../../components/Button/RoundBtn/RoundBtn";
import { useFontsLoaded } from "../../utils/fontContext";
import useUserStore from "../../store/useUserStore";
import { apiClient } from "../../customAxios";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const fontsLoaded = useFontsLoaded();
  const screenHeight = Dimensions.get("window").height;

  // 로그인 버튼 클릭 시 웹 로그인 페이지로 이동
  const handleLogin = async () => {
    // 로컬 IP 주소로 변경
    const redirectUri = Linking.createURL('redirect');
    // const redirectUri = `https://auth.expo.io/@maon/maon`;
    const authUrl = `https://maon--login.web.app?redirect_uri=${redirectUri}`; // 또는 ngrok 주소로 변경
  
    // 웹 브라우저에서 로그인 페이지 열기
    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    if (result.type === 'success' && result.url) {
      const { token, name, email } = Linking.parse(result.url).queryParams;
      setUserInfo({ token, name, email });
      console.log("토큰 확인용: ", token )

      // 가입한 적이 있는 회원이면 어떻게 처리할지 생각해보기(회원가입 과정 안 거치고 바로 홈으로 넘어가야 함)
      login(token)
      navigation.navigate("SignUp", {paramsName: name, paramsEmail: email})
    }
  };

  // const requestBody = {
  //   memberId: memberId,
  //   maxMember: maxMember,
  //   orderId: orderId,
  //   merchantId: merchantId,
  //   merchantName: merchantName,
  //   categoryId: categoryId,
  //   totalPrice: totalPrice,
  // };
  const login = async (accessToken) => {
    try {
      const response = await apiClient.get(
        `/member/member/login`,
        // requestBody,
        {
          params: {
            token: accessToken, // query parameter로 token 추가
          },
          withCredentials: true,
          // headers: {
          //   Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
          // },
        }
      );

      navigation.navigate("SignUp")

    } catch (error) {
      console.error("로그인 에러 발생: ", error);
    }
  };



  if (!fontsLoaded) {
    return null;
  }

  return (
    <Container>
      <View style={{ width: "100%", height: screenHeight, zIndex: 2, position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.4)" }} />
      <Image source={backImg} style={{ position: "absolute", height: screenHeight }} />
      <Wrap>
        <Logo>MA:ON</Logo>
        <RoundBtn text={"Google로 로그인"} onPress={handleLogin} />
        {userInfo && (
          <View>
            <Text style={{color: "white"}}>Welcome, {userInfo.name}</Text>
            <Text style={{color: "white"}}>Email: {userInfo.email}</Text>
            <Text style={{color: "white"}}>Token: {userInfo.token}</Text>
          </View>
        )}
      </Wrap>
    </Container>
  );
};

export default LoginScreen;
