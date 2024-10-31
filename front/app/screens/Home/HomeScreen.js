import { SafeAreaView, View, Text, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { OpenModalBtn, OpenModalBtnText } from "./HomeScreenStyle";
const HomeScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <SafeAreaView>
      <View>
        <OpenModalBtn
          title=""
          onPress={() => {
            console.log("here");
            navigation.navigate("Modal");
          }}
        >
          <OpenModalBtnText>모달열기</OpenModalBtnText>
        </OpenModalBtn>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
