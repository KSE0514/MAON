import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import {
  AloneRunBtn,
  ButtonList,
  FriendList,
  MaraThonInfoArea,
  TogetherRunBtn,
  Wrapper,
} from "./HomeScreenStyle";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import HeaderNavigation from "../../components/HeaderNavigation/HeaderNavigation";
import fonts from "../../styles/fonts";
import GradientButton from "../../components/Button/GradientsBtn/GradientsButton";

const HomeScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper>
      <HeaderNavigation />
      <ButtonList>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <GradientButton
            onPress={() => {
              navigation.navigate("Home");
            }}
            title={`혼자\n달리기\n모드`}
            gradientType="orange_gradient"
            direction="diagonalTopLeftToBottomRight"
            mode="alone"
          />
          <View style={{ flex: "1", marginLeft: 10 }}>
            <GradientButton
              onPress={() => {
                navigation.navigate("Home");
              }}
              title={`함께\n달리기`}
              gradientType="grape_fruit_gradient"
              direction="diagonalTopLeftToBottomRight"
              mode="together"
            />
            <GradientButton
              onPress={() => {
                navigation.navigate("Home");
              }}
              title={`친구목록`}
              gradientType="balck_gradient"
              mode="friend"
            />
          </View>
        </View>
      </ButtonList>
      <MaraThonInfoArea>
        <Text style={styles.font}>마라톤 정보</Text>
      </MaraThonInfoArea>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  font: {
    fontFamily: fonts.gMarketBold,
  },
});
export default HomeScreen;
