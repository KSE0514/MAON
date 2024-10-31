import { SafeAreaView, View, Text, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { Wrapper } from "./HomeScreenStyle";
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
    </Wrapper>
  );
};
export default HomeScreen;
