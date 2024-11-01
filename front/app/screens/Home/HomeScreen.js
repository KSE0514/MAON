import { SafeAreaView, View, Text, Button, TouchableOpacity } from "react-native";
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
const HomeScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper>
      <HeaderNavigation />
      <ButtonList>
        <View>
          <AloneRunBtn>
            <Text>혼자 달리기 모드</Text>
          </AloneRunBtn>
          <View>
            <TogetherRunBtn>
              <Text>함께 달리기 모드</Text>
            </TogetherRunBtn>
            <FriendList>
              <Text>친구 목록</Text>
            </FriendList>
          </View>
        </View>
      </ButtonList>
      <MaraThonInfoArea>
        <Text>마라톤 정보</Text>
      </MaraThonInfoArea>
    </Wrapper>
  );
};
export default HomeScreen;
