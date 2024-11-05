import { SafeAreaView, View, Text, Button, Image } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
const InfoPreview = ({ navigation, data, mode }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper>
      <Col>
        <View>
          <Image></Image>
          {mode == "searchInfo" && (
            <View>{true ? <Text>접수중</Text> : <Text>접수마감</Text>}</View>
          )}
        </View>
      </Col>
      <Col>
        <View>
          <Text></Text>
        </View>
      </Col>
    </Wrapper>
  );
};
export default InfoPreview;
