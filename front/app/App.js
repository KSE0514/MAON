import { useState, useEffect, createContext, useContext } from "react";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ModalTestScreen from "./screens/ModalTest/ModalTestScreen";
import HomeScreen from "./screens/Home/HomeScreen.js";
import { FontContext } from "./utils/fontContext.js";

const Stack = createStackNavigator();

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Modal" component={ModalTestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FontContext.Provider>
  );
}
