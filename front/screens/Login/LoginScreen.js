import React from "react";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import color from "../../styles/colors";
import backImg from "./../../assets/images/Login_Back_cut2.jpg";
import { Container, Logo, Wrap } from "./LoginScreenStyles";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { Dimensions } from "react-native";
import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";
import useUserStore from "../../store/useUserStore";

import RoundBtn from "../../components/Button/RoundBtn/RoundBtn";

// Google OAuth 클라이언트 ID (Google Cloud Console에서 발급받은 ID로 대체하세요)
const CLIENT_ID = "512721321300-u08i7mqrguoh6oore1gkihr54ukigqh0.apps.googleusercontent.com";

// client-id: 512721321300-u08i7mqrguoh6oore1gkihr54ukigqh0.apps.googleusercontent.com
// client-secret: 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

const LoginScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();
  const screenHeight = Dimensions.get("window").height;
  const setUser = useUserStore((state) => state.setUser);

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    const handleUrl = ({ url }) => {
      const { queryParams } = Linking.parse(url);
      const idToken = queryParams.id_token;
  
      if (idToken) {
        console.log('Logged in with Google ID Token:', idToken);
        sendIdTokenToServer(idToken);
      }
    };
  
    Linking.addEventListener('url', handleUrl); // 기존 addListener 대신 addEventListener 사용
  
    return () => {
      Linking.removeEventListener('url', handleUrl); // 기존 remove 대신 removeEventListener 사용
    };
  }, []);
  

  // 서버로 id_token을 전송하는 함수
  const sendIdTokenToServer = async (idToken) => {
    try {
      const response = await fetch('https://your-server.com/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const serverResponse = await response.json();
      console.log('Server Response:', serverResponse);

      if (serverResponse.success) {
        // 서버가 인증에 성공하면 사용자 정보 상태 저장
        setUser({
          name: serverResponse.name,
          email: serverResponse.email,
          imageUrl: serverResponse.picture,
        });
        navigation.navigate("Home"); // 인증 후 원하는 화면으로 이동
      }
    } catch (error) {
      console.error("Failed to send ID Token to server:", error);
    }
  };

  const signInWithGoogle = async () => {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "maon", // 위에서 설정한 스킴 이름과 동일해야 합니다.
    });
  
    // 인증 URL 생성
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `response_type=code&` +
      `client_id=${CLIENT_ID}&` +
      `scope=openid%20email%20profile&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `state=abcd1234&` +
      `nonce=abcd1234`;
  
    const result = await AuthSession.startAsync({ authUrl });
  
    if (result.type === 'success' && result.params.code) {
      const authorizationCode = result.params.code;
      console.log('Authorization Code:', authorizationCode);
  
      // 서버에 authorizationCode를 보내어 토큰을 교환합니다
      sendAuthorizationCodeToServer(authorizationCode);
    } else {
      console.log("Google login was canceled or failed.");
    }
  };

  const sendAuthorizationCodeToServer = async (authorizationCode) => {
    try {
      const response = await fetch('https://your-server.com/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorizationCode }),
      });
  
      const serverResponse = await response.json();
      console.log('Server Response:', serverResponse);
  
      if (serverResponse.success) {
        // 서버가 인증에 성공하면 사용자 정보 상태 저장
        setUser({
          name: serverResponse.name,
          email: serverResponse.email,
          imageUrl: serverResponse.picture,
        });
        navigation.navigate("Home"); // 인증 후 원하는 화면으로 이동
      }
    } catch (error) {
      console.error("Failed to send Authorization Code to server:", error);
    }
  };

  return (
    <Container>
      <View
        style={{
          width: "100%",
          height: screenHeight,
          zIndex: 2,
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
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
