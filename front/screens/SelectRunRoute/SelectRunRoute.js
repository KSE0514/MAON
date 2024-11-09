import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MarathonInfoSearchBar from "../../components/MarathonInfoSearchBar/MarathonInfoSearchBar";
import { useFontsLoaded } from "../../utils/fontContext";
import { Bottom, List, Top, Wrapper } from "./SelectRunRouteStyle";
import { useState } from "react";
import RouteInfoPreview from "../../components/RouteInfoPreview/RouteInfoPreview";

const SelectRunRoute = ({ navigation }) => {
  const [info, setInfo] = useState([
    {
      address: "전남, 무안군",
      name: "2024 무안 해안 노을길 마라톤",
      registerDate: "2024.11.03",
      routeLenght: "5",
      register: "무안군",
      id: "123",
    },
    {
      address: "전남, 무안군",
      name: "2024 무안 해안 노을길 마라톤",
      registerDate: "2024.11.03",
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
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
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
              {info.map((route) => (
                <RouteInfoPreview
                  data={route}
                  mode="searchInfo"
                  moveDetail={() => {
                    // routeId랑 같이 보내기
                    navigation.navigate("RouteDetail", { routeId: 1 });
                  }}
                />
              ))}
            </List>
          </Bottom>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SelectRunRoute;
