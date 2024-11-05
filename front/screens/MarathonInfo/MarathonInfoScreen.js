import { SafeAreaView, View, Text, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import MarathonInfoSearchBar from "../../components/MarathonInfoSearchBar/MarathonInfoSearchBar";
import { Bottom, Top, Wrapper } from "../SelectRunRoute/SelectRunRouteStyle";
const MarathonInfo = ({ navigation, route }) => {
  const fontsLoaded = useFontsLoaded();
  const { mode } = route.params;

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Wrapper>
        <Top>
          <MarathonInfoSearchBar
            searchType={"searchInfo"}
            onPress={() => {
              alert("hello");
            }}
          />
        </Top>
        <Bottom></Bottom>
      </Wrapper>
    </SafeAreaView>
  );
};
export default MarathonInfo;
