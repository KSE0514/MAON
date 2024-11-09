import React, { useState } from "react";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import color from "../../styles/colors";
import backImg from "./../../assets/images/Login_Back_cut2.jpg";
import { Container, Logo, Wrap } from "./LoginScreenStyles";
import { StyleSheet, View, Text, SafeAreaView, Image, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { Dimensions } from "react-native";
// import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";
import useUserStore from "../../store/useUserStore";

import RoundBtn from "../../components/Button/RoundBtn/RoundBtn";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Google OAuth 클라이언트 ID (Google Cloud Console에서 발급받은 ID로 대체하세요)
const CLIENT_ID = "512721321300-u08i7mqrguoh6oore1gkihr54ukigqh0.apps.googleusercontent.com";

// client-id: 512721321300-u08i7mqrguoh6oore1gkihr54ukigqh0.apps.googleusercontent.com
// client-secret: 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

// ===============
// web: 829861143776-vile4mn27hpskphq0fsa1a1u0mf5ieqg.apps.googleusercontent.com
// ios: 829861143776-b7lo4tf09top8dq7k99i3r32ebj1o3qv.apps.googleusercontent.com
// android: 829861143776-h9b4vtl9r0dp4636cn754n1p2snalh4o.apps.googleusercontent.com
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";



// 로그인 버튼 누르면 웹 브라우저가 열리고, 구글 로그인 페이지로 이동함.- 2024.11.09
// WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();
  const screenHeight = Dimensions.get("window").height;
  const setUser = useUserStore((state) => state.setUser);


  // /////////////////////////////////////////// 2024.11.09 

  // 안드로이드, 웹 클라이언트 아이디를 사용하여 인증 요청 보냄.
  // Google 인증 요청을 위한 훅 초기화
  // promptAsync: 인증 요청 보냄.
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "829861143776-h9b4vtl9r0dp4636cn754n1p2snalh4o.apps.googleusercontent.com",
    iosClientId: "829861143776-b7lo4tf09top8dq7k99i3r32ebj1o3qv.apps.googleusercontent.com",
    webClientId: "829861143776-vile4mn27hpskphq0fsa1a1u0mf5ieqg.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    webClientId: "517964408407-o44n8rq8fvc58bbj6jmhfu8k2hlu6ss5.apps.googleusercontent.com",
    androidClientId: "517964408407-lfjf2i7sd8p1q7rsmq3uv33l66hd9n5v.apps.googleusercontent.com",
    iosClientId: "517964408407-1gvbjjp2hg9qjfrc1mmhv37s91507e3q.apps.googleusercontent.com"
  });

  const [userInfo, setUserInfo] = React.useState(null);

  // Google 로그인 처리하는 함수
  const handleSignInWithGoogle = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        // 인증 요청에 대한 응답이 성공이면, 토큰을 이용하여 유저 정보를 가져옴.
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
      // 유저 정보가 이미 있으면, 유저 정보를 가져옴.
      setUserInfo(JSON.parse(user));
    }
  };

  // 토큰을 이용하여 유저 정보를 가져오는 함수
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // 에러 발생시 할 것
    }
  };
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userInfoResponse = await response.json();
      // 유저 정보를 AsyncStorage에 저장, 상태업뎃
      await AsyncStorage.setItem("@user", JSON.stringify(userInfoResponse));
      setUserInfo(userInfoResponse);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
  };

  // Google 인증 응답이 바뀔때마다 실행
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);



  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    const handleUrl = ({ url }) => {
      const { queryParams } = Linking.parse(url);
      const idToken = queryParams.id_token;

      if (idToken) {
        console.log("Logged in with Google ID Token:", idToken);
        sendIdTokenToServer(idToken);
      }
    };

    Linking.addEventListener("url", handleUrl); // 기존 addListener 대신 addEventListener 사용

    return () => {
      Linking.removeEventListener("url", handleUrl); // 기존 remove 대신 removeEventListener 사용
    };
  }, []);

  // 서버로 id_token을 전송하는 함수
  const sendIdTokenToServer = async (idToken) => {
    try {
      const response = await fetch("https://your-server.com/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const serverResponse = await response.json();
      console.log("Server Response:", serverResponse);

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
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `response_type=code&` +
      `client_id=${CLIENT_ID}&` +
      `scope=openid%20email%20profile&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `state=abcd1234&` +
      `nonce=abcd1234`;

    const result = await AuthSession.startAsync({ authUrl });

    if (result.type === "success" && result.params.code) {
      const authorizationCode = result.params.code;
      console.log("Authorization Code:", authorizationCode);

      // 서버에 authorizationCode를 보내어 토큰을 교환합니다
      sendAuthorizationCodeToServer(authorizationCode);
    } else {
      console.log("Google login was canceled or failed.");
    }
  };

  const sendAuthorizationCodeToServer = async (authorizationCode) => {
    try {
      const response = await fetch("https://your-server.com/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authorizationCode }),
      });

      const serverResponse = await response.json();
      console.log("Server Response:", serverResponse);

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
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>
        <RoundBtn text={"Google로 로그인"} onPress={() => {
          promptAsync();
        }} />
        <Button title="logout" onPress={() => handleLogout()} />
      </Wrap>
    </Container>
  );
};

// const styles = StyleSheet.create({npm
//   logo: {

//   }
// })

export default LoginScreen;
