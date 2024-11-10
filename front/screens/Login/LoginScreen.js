import React, { useState, useEffect } from "react";
import { Dimensions, View, Image, Button, Platform } from "react-native";
import { Container, Logo, Wrap } from "./LoginScreenStyles";
import backImg from "./../../assets/images/Login_Back_cut2.jpg";
import * as GoogleSignIn from "expo-google-sign-in";
import RoundBtn from "../../components/Button/RoundBtn/RoundBtn";
import useUserStore from "../../store/useUserStore";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";

// 초기화
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const screenHeight = Dimensions.get("window").height;
  const { setUserInfo } = useUserStore();

  // Google Sign-In 초기화
  useEffect(() => {
    const initGoogleSignIn = async () => {
      await GoogleSignIn.initAsync({
        signInType: GoogleSignIn.TYPES.DEFAULT,
        clientId:
          Platform.OS === "android"
            ? Constants.manifest.extra.androidClientId
            : Constants.manifest.extra.iosClientId,
        scopes: [
          GoogleSignIn.SCOPES.OPEN_ID,
          GoogleSignIn.SCOPES.EMAIL,
          GoogleSignIn.SCOPES.PROFILE,
        ],
      });
      await GoogleSignIn.askForPlayServicesAsync(); // Play 서비스 확인
    };

    initGoogleSignIn();
  }, []);

  // Google 로그인 함수
  const googleLogin = async () => {
    try {
      const response = await GoogleSignIn.signInAsync();
      if (response) {
        console.log("로그인 성공:", response);
        setUser(response.user); // 로컬 상태에 사용자 정보 저장
        setUserInfo(response.user); // 상태 관리에 사용자 정보 저장
      }
    } catch (error) {
      console.error("Google 로그인 실패: ", error);
    }
  };

  // 로그아웃 함수
  const googleLogout = async () => {
    try {
      await GoogleSignIn.signOutAsync();
      setUser(null); // 로컬 상태 초기화
      setUserInfo(null); // 상태 관리 초기화
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패: ", error);
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
        <RoundBtn text={"Google로 로그인"} onPress={googleLogin} />
        {user && <Button title="Logout" onPress={googleLogout} />}
      </Wrap>
    </Container>
  );
};

export default LoginScreen;
