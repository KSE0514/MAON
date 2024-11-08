import React, { useState } from "react";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import color from "../../styles/colors";
import backImg from "./../../assets/images/Login_Back_cut2.jpg";
import { Container, Logo, Wrap } from "./LoginScreenStyles";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { Dimensions } from "react-native";
// import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";
import useUserStore from "../../store/useUserStore";

import RoundBtn from "../../components/Button/RoundBtn/RoundBtn";

import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Google OAuth 클라이언트 ID (Google Cloud Console에서 발급받은 ID로 대체하세요)
// const CLIENT_ID = "512721321300-u08i7mqrguoh6oore1gkihr54ukigqh0.apps.googleusercontent.com";

// client-id: 512721321300-u08i7mqrguoh6oore1gkihr54ukigqh0.apps.googleusercontent.com
// client-secret: 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

// ===============
// web: 829861143776-vile4mn27hpskphq0fsa1a1u0mf5ieqg.apps.googleusercontent.com
// ios: 829861143776-b7lo4tf09top8dq7k99i3r32ebj1o3qv.apps.googleusercontent.com
// android: 829861143776-h9b4vtl9r0dp4636cn754n1p2snalh4o.apps.googleusercontent.com

const LoginScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();
  const screenHeight = Dimensions.get("window").height;
  const setUser = useUserStore((state) => state.setUser);
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "829861143776-h9b4vtl9r0dp4636cn754n1p2snalh4o.apps.googleusercontent.com",
    iosClientId: "829861143776-b7lo4tf09top8dq7k99i3r32ebj1o3qv.apps.googleusercontent.com",
    webClientId: "829861143776-vile4mn27hpskphq0fsa1a1u0mf5ieqg.apps.googleusercontent.com",
    expoClientId: "829861143776-vile4mn27hpskphq0fsa1a1u0mf5ieqg.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response])


  async function handleSignInWithGoogle () {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user))
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // 에러 발생시 할 것
    }
  }



  if (!fontsLoaded) {
    return null;
  }


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
        <Text>{JSON.stringify(userInfo)}</Text>
        <RoundBtn text={"Google로 로그인"} onPress={() => promptAsync()} />
      </Wrap>
    </Container>
  );
};

// const styles = StyleSheet.create({
//   logo: {

//   }
// })

export default LoginScreen;
