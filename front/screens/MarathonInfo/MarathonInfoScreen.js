import { SafeAreaView, View, Text, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import MarathonInfoSearchBar from "../../components/MarathonInfoSearchBar/MarathonInfoSearchBar";
import {
  Bottom,
  List,
  Top,
  Wrapper,
} from "../SelectRunRoute/SelectRunRouteStyle";
import InfoPreview from "../../components/InfoPreview/InfoPreview";
import { useState } from "react";
const MarathonInfo = ({ navigation, route }) => {
  const fontsLoaded = useFontsLoaded();
  const { mode } = route.params;
  const [infos, setInfos] = useState([
    {
      address: "전남, 무안군",
      name: "2024 무안 해안 노을길 마라톤",
      price: "무료",
      eventDate: "2024.11.03",
      routeLenght: ["5", "10", "full", "half"],
      id: "123",
    },
  ]);
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
        <Bottom>
          <List>
            {infos.map((info) => (
              <InfoPreview data={info} mode="searchInfo" />
            ))}
          </List>
        </Bottom>
      </Wrapper>
    </SafeAreaView>
  );
};
export default MarathonInfo;
