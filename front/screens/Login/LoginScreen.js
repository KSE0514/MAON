import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, Dimensions } from "react-native";
import { Container, Logo, Wrap } from "./LoginScreenStyles";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backImg from "./../../assets/images/Login_Back_cut2.jpg";
import useUserStore from "../../store/useUserStore";
import RoundBtn from "../../components/Button/RoundBtn/RoundBtn";
import { GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebaseConfig"; // firebaseConfig에서 초기화된 auth 가져오기
import * as Google from 'expo-auth-session/providers/google';

const LoginScreen = ({ navigation }) => {
  const screenHeight = Dimensions.get("window").height;
  const setUser = useUserStore((state) => state.setUser);
  const [userInfo, setUserInfo] = useState(null);

  // Google 인증 요청을 위한 훅 초기화
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '517964408407-o44n8rq8fvc58bbj6jmhfu8k2hlu6ss5.apps.googleusercontent.com', // Google 클라이언트 ID를 입력하세요
    redirectUri: "https://auth.expo.io/@maon/maon", // 앱 스킴 사용
    scopes: ["openid", "email", "profile"],
    useProxy: true,
  });

  // Firebase로 구글 로그인 처리
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;
          setUserInfo(user);
          await AsyncStorage.setItem("@user", JSON.stringify(user));
          console.log("Firebase 로그인 성공:", user);
        })
        .catch(error => {
          console.log("Firebase 로그인 오류:", error);
        });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
    console.log("User logged out");
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
        <Text style={{ color: "white" }}>{JSON.stringify(userInfo, null, 2)}</Text>
        <RoundBtn text={"Google로 로그인"} onPress={() => promptAsync()} />
        <Button title="logout" onPress={handleLogout} />
      </Wrap>
    </Container>
  );
};

export default LoginScreen;
