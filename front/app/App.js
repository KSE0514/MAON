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
import FriendListScreen from "./screens/FriendList/FriendListScreen.js";
import FooterNavigation from "./components/FooterNavigation/FooterNavigation.js";
import { FontContext } from "./utils/fontContext.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        gMarketBold: require("../app/assets/fonts/GmarketSansTTFBold.ttf"),
        gMarketLight: require("../app/assets/fonts/GmarketSansTTFLight.ttf"),
        gMarketMedium: require("../app/assets/fonts/GmarketSansTTFMedium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // 폰트 로딩 중에는 렌더링을 방지
  }

  return (
    <FontContext.Provider value={fontsLoaded}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          {/* FooterNavigation이 포함된 화면들 */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
          {/* FooterNavigation이 포함되지 않은 화면 */}
          <Stack.Screen name="Modal" component={ModalTestScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="MyPage" component={MyPageScreen} />
          {/* <Stack.Screen name="Home" component={ScreenWithFooter(HomeScreen)} />
          <Stack.Screen name="MarathonInfo" component={ScreenWithFooter(MarathonInfoScreen)} />
          <Stack.Screen name="Record" component={ScreenWithFooter(RecordScreen)} />
          <Stack.Screen name="Challenge" component={ScreenWithFooter(ChallengeScreen)} />
          <Stack.Screen name="Modal" component={ScreenWithFooter(ModalTestScreen)} /> */}
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
      <Tab.Screen name="Marathon" component={MarathonInfoScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="Challenge" component={ChallengeScreen} />
      <Tab.Screen name="FriendList" component={FriendListScreen} />
    </Tab.Navigator>
  );
};
