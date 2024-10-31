import { SafeAreaView, View, Text, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
const ChallengeScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <SafeAreaView>
      <View>
      <Text>챌린지 화면</Text>
        {/* <OpenModalPageBtn
          title=""
          onPress={() => {
            console.log("here");
            navigation.navigate("Modal");
          }}
        >
          <OpenModalPageBtnText>모달 테스트 페이지로 이동</OpenModalPageBtnText>
        </OpenModalPageBtn> */}
      </View>
    </SafeAreaView>
  );
};
export default ChallengeScreen;