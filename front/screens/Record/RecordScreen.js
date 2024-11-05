import {
  Wrapper
} from './RecordScreenStyles'
import { SafeAreaView, View, Text, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
const RecordScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper>
        <Text>기록 화면</Text>
    </Wrapper>
  );
};
export default RecordScreen;