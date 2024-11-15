import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
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
import useAuthStore from "./../../store/AuthStore";
import color from "../../styles/colors";
import { useEffect } from "react";

const { width } = Dimensions.get("window");
const HomeScreen = ({ navigation }) => {
  const { user } = useAuthStore();

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
                navigation.navigate("PairingWatch");
                // navigation.navigate("Modal");
              }}
              title={`워치연동`}
              gradientType="balck_gradient"
              mode="watch"
            />
          </View>
        </View>
      </ButtonList>
      <MaraThonInfoArea>
        <View>
          <Image source={require("../../assets/images/homeLine.png")} />
          <Text style={[styles.font, styles.previewTitle]}>다가오는 일정</Text>
        </View>
        <View style={styles.shadowContainer}>
          <CarouselView>
            <CustomCarousel navigation={navigation} />
          </CarouselView>
        </View>
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
    marginVertical: 10,
  },
  previewTitle: {
    fontSize: 18,
    color: "white",
    position: "absolute",
    top: 18,
    left: width * 0.05,
  },
});
export default HomeScreen;
