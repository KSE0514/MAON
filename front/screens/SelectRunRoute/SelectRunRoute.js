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
import { useEffect, useState } from "react";
import RouteInfoPreview from "../../components/RouteInfoPreview/RouteInfoPreview";
import { apiClient } from "../../customAxios";

const SelectRunRoute = ({ navigation }) => {
  const [info, setInfo] = useState([]);
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  const getRouteList = async () => {
    //정보 받아오기
    try {
      const response = await apiClient.get(`/route/course/list`);
      setInfo(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log("get route list error: " + error);
    }
  };
  useEffect(() => {
    getRouteList();
  }, []);

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
