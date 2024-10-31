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
<<<<<<< HEAD
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
=======
    <View style={styles.container}>
      <Text>안녕하세요!</Text>
      <HeaderNavigation />
      <InputBox label={'라벨'} placeholder={'이름'} />
      <SquareBtn text={'테스트용'} onPress={()=>Alert.alert("함수 넘김 테스트 중입니다.")} />
      <SearchBar />
      {/* <UserStatusBtn text={"요청하기"}></UserStatusBtn> */}
      <RoundBtn text={'참가 신청하기'} onPress={()=>Alert.alert("라운드 함수 넘김 테스트 중입니다.")} />
      <UserBtn proImg={testProfile} level={5} name={'마미남'} status={'show-detail'}/>
      {/* <UserBtn proImg={testProfile} level={5} name={'마미남'} status={'수락대기'}/>
      <UserBtn proImg={testProfile} level={5} name={'마미남'} status={'요청하기'}/>
      <UserBtn proImg={testProfile} level={5} name={'마미남'} status={'친구신청'}/> */}
      <FooterNavigation />
      <StatusBar style="auto" />
    </View>
>>>>>>> dev
  );
}
