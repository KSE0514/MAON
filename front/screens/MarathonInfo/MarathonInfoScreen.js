import { SafeAreaView, View, Text, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import MarathonInfoSearchBar from "../../components/MarathonInfoSearchBar/MarathonInfoSearchBar";
import { Wrapper } from "./MarathonInfoScreenStyle";
const MarathonInfo = ({ navigation, route }) => {
  const fontsLoaded = useFontsLoaded();
  const { mode } = route.params;

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper>
      <MarathonInfoSearchBar
        searchType="searchInfo"
        onPress={() => {
          alert("hello");
        }}
      />
    </Wrapper>
  );
};
export default MarathonInfo;
