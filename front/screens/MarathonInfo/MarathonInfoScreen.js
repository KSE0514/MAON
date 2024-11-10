import { SafeAreaView, View, Text, Button, ScrollView } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import MarathonInfoSearchBar from "../../components/MarathonInfoSearchBar/MarathonInfoSearchBar";
import {
  Bottom,
  List,
  Top,
  Wrapper,
} from "../SelectRunRoute/SelectRunRouteStyle";
import { useEffect, useState } from "react";
import MarathonInfoPreview from "../../components/MaraThonInfoPreview/MaraThonInfoPreview";
import { apiClient } from "../../customAxios";
const MarathonInfo = ({ navigation, route }) => {
  const fontsLoaded = useFontsLoaded();
  const { mode } = route.params;
  const [infos, setInfos] = useState([]);
  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  useEffect(() => {
    const getMarathonInfo = async () => {
      console.log("get Data!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      try {
        const response = await apiClient.post(
          `/tournament/tournament/getMarathon`,
          {
            year: new Date().getFullYear(),
            month: 0,
            area: 0,
            closed: true,
          }
        );
        console.log(response.data.data);
        setInfos(response.data.data || []); // 데이터가 없을 때 빈 배열로 설정
      } catch (e) {
        console.log("get marathoninfo error:", e);
      }
    };
    getMarathonInfo();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
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
              {infos?.map((info) => (
                <MarathonInfoPreview
                  key={info.uuid}
                  data={info}
                  mode="searchInfo"
                  navigation={navigation}
                />
              ))}
            </List>
          </Bottom>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MarathonInfo;
