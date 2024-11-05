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
import { Bottom, List, Top, Wrapper } from "./SelectRunRouteStyle";
import { useState } from "react";

const SelectRunRoute = () => {
  const [infos, setInfos] = useState([
    {
      address: "전남, 무안군",
      name: "2024 무안 해안 노을길 마라톤",
      registeDate: "2024.11.03",
      routeLenght: "5",
      register: "무안군",
      id: "123",
    },
  ]);
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
export default SelectRunRoute;
