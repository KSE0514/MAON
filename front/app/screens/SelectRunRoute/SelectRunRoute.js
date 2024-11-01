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
import { Wrapper } from "./SelectRunRouteStyle";

const SelectRunRoute = () => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  return (
    <Wrapper>
      <MarathonInfoSearchBar
        mode={"run"}
        onPress={() => {
          alert("hello");
        }}
      />
    </Wrapper>
  );
};
export default SelectRunRoute;
