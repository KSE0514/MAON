import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import {
  AloneRunBtn,
  ButtonList,
  CarouselView,
  FriendList,
  MaraThonInfoArea,
  TogetherRunBtn,
  Wrapper,
} from "./HomeScreenStyle";
import HeaderNavigation from "../../components/HeaderNavigation/HeaderNavigation";
import fonts from "../../styles/fonts";
import GradientButton from "../../components/Button/GradientsBtn/GradientsButton";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
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
              navigation.navigate("SelectRunType");
            }}
            title={`혼자\n달리기\n모드`}
            gradientType="orange_gradient"
            direction="diagonalTopLeftToBottomRight"
            mode="alone"
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <GradientButton
              onPress={() => {
                navigation.navigate("SelectRunType");
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
        <View>
          <View></View>
          <View>
            <Text style={styles.font}>참여예정인 마라톤</Text>
          </View>
        </View>
        <CarouselView>
          <CustomCarousel />
        </CarouselView>
      </MaraThonInfoArea>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  font: {
    fontFamily: fonts.gMarketBold,
  },
  shadowContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5, // Android 전용
    borderRadius: 20,
  },
});
export default HomeScreen;
