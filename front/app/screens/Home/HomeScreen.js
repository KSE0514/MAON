import { SafeAreaView, View, Text, Button, TouchableOpacity } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { OpenModalPageBtn, OpenModalPageBtnText } from "./HomeScreenStyle";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
const HomeScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <SafeAreaView>
      <View>
        <OpenModalPageBtn
          title=""
          onPress={() => {
            console.log("here");
            navigation.navigate("Modal");
          }}
        >
          <OpenModalPageBtnText>모달 테스트 페이지로 이동</OpenModalPageBtnText>
        </OpenModalPageBtn>
        {/* <FooterNavigation /> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text>로그인 화면</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
