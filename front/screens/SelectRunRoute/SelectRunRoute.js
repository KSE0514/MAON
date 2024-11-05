import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import MarathonInfoSearchBar from "../../components/MarathonInfoSearchBar/MarathonInfoSearchBar";
import { useFontsLoaded } from "../../utils/fontContext";
import { Bottom, Top, Wrapper } from "./SelectRunRouteStyle";

const SelectRunRoute = () => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Wrapper>
        <Top>
          <MarathonInfoSearchBar
            searchType={"run"}
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
export default SelectRunRoute;
