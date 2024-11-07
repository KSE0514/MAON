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

  // 화면 크기에 따라 텍스트 크기 조정
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // const fontSize = screenWidth * 0.2; // 화면 너비의 20%로 글자 크기 설정

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  const checkUser = () => {
    console.log("가입한적 있으면 버튼도 안 보이고 바로 홈 화면으로");
    navigation.navigate("SignUp");
  };

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleUrl = ({ url }) => {
      const { queryParams } = Linking.parse(url);
      const token = queryParams.access_token;

      if (token) {
        console.log("Logged in with Google Token:", token);
        // 토큰을 상태에 저장하고, 로그인 상태로 전환하거나 다른 화면으로 이동
      }
    };

    Linking.addEventListener("url", handleUrl);

    return () => {
      Linking.removeEventListener("url", handleUrl);
    };
  }, []);

  const signInWithGoogle = async () => {
    // 커스텀 스킴을 사용해 redirectUri 생성
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "maon", // 위에서 설정한 스킴 이름과 동일해야 합니다.
    });

    // 인증 URL 생성
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=token&scope=profile email`;

    // 로그인 요청 보내기
    const result = await AuthSession.startAsync({ authUrl });

    if (result.type === "success") {
      // 로그인 성공 시, result.params.access_token에서 액세스 토큰을 가져올 수 있습니다.
      const token = result.params.access_token;
      console.log("Google Access Token:", token);

      const userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userInfo = await userInfoResponse.json();

      // 상태 저장
      setUser({
        name: userInfo.name,
        email: userInfo.email,
        imageUrl: userInfo.picture,
      });
      // 여기서 토큰을 상태에 저장하고 원하는 화면으로 전환
    } else {
      console.log("Google login was canceled or failed.");
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
