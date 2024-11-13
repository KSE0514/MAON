import { useState, useEffect, createContext, useContext } from "react";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View, sta } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ModalTestScreen from "./screens/ModalTest/ModalTestScreen";
import HomeScreen from "./screens/Home/HomeScreen.js";
import MarathonInfoScreen from "./screens/MarathonInfo/MarathonInfoScreen.js";
import RecordScreen from "./screens/Record/RecordScreen.js";
import ChallengeScreen from "./screens/Challenge/ChallengeScreen.js";
import LoginScreen from "./screens/Login/LoginScreen.js";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen.js";
import MyPageScreen from "./screens/MyPage/MyPageScreen.js";
import CreateTeamScreen from "./screens/CreateTeam/CreateTeamScreen.js";
import NotificationScreen from "./screens/Notification/NotificationScreen.js";
import MarathonEntryFormScreen from "./screens/MarathonEntryForm/MarathonEntryFormScreen.js";
import MarathonInfoDetailScreen from "./screens/MarathonInfoDetail/MarathonInfoDetailScreen.js";
import FooterNavigation from "./components/FooterNavigation/FooterNavigation.js";
import { FontContext } from "./utils/fontContext.js";
import SelectRunType from "./screens/SelectRunType/SelectRunType.js";
import SelectRunRoute from "./screens/SelectRunRoute/SelectRunRoute.js";
import MarathonInfo from "./screens/MarathonInfo/MarathonInfoScreen.js";
import RunningAlone from "./screens/RunningAlone/RunningAlone.js";
import RunResult from "./screens/RunResult/RunResult.js";
import RouteDetail from "./screens/RouteDetail/RouteDetail.js";
import RunningWithRoute from "./screens/RunningWithRoute/RunningWithRoute.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        gMarketBold: require("./assets/fonts/GmarketSansTTFBold.ttf"),
        gMarketLight: require("./assets/fonts/GmarketSansTTFLight.ttf"),
        gMarketMedium: require("./assets/fonts/GmarketSansTTFMedium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();


    // 로그인 상태 확인 로직 (예시)
    const checkLoginStatus = async () => {
      // 여기에 실제 로그인 상태 확인 로직을 추가하세요
      // 예를 들어, AsyncStorage에서 토큰 확인
      const token = null; // 로그인 토큰 예시 (없으면 false 상태 유지)
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  if (!fontsLoaded) {
    return null; // 폰트 로딩 중에는 렌더링을 방지
  }

  return (
    <FontContext.Provider value={fontsLoaded}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? "MainTabs" : "Login"}
        >
          {/* 로그인 여부에 따른 화면 설정 */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />

          {/* FooterNavigation이 포함되지 않은 화면 */}
          <Stack.Screen name="Modal" component={ModalTestScreen} />
          <Stack.Screen name="SelectRunType" component={SelectRunType} />
          <Stack.Screen name="SelectRunRoute" component={SelectRunRoute} />
          <Stack.Screen name="MarathonInfo" component={MarathonInfo} />
          <Stack.Screen name="RunningAlone" component={RunningAlone} />
          <Stack.Screen name="RunResult" component={RunResult} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="MyPage" component={MyPageScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
          <Stack.Screen name="Challenge" component={ChallengeScreen} />
          <Stack.Screen
            name="MarathonEntryForm"
            component={MarathonEntryFormScreen}
          />
          <Stack.Screen
            name="MarathonInfoDetail"
            component={MarathonInfoDetailScreen}
          />
          <Stack.Screen name="RouteDetail" component={RouteDetail} />
          <Stack.Screen name="RunningWithRoute" component={RunningWithRoute} />
        </Stack.Navigator>
      </NavigationContainer>
    </FontContext.Provider>
  );
}

// FooterNavigation이 포함된 하단 탭 네비게이션 설정
const MainTabs = ({ route }) => {
  return (
    <Tab.Navigator
      tabBar={({ state }) => (
        <FooterNavigation currentRoute={state.routes[state.index].name} />
      )}
      screenOptions={{
        headerShown: false, // 헤더 숨기기
        animationEnabled: false, // 애니메이션 비활성화
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MarathonInfo" component={MarathonInfoScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
      {/* <Tab.Screen name="Challenge" component={ChallengeScreen} /> */}
      {/* <Tab.Screen name="FriendList" component={CreateTeamScreen} /> */}
    </Tab.Navigator>
  );
};
