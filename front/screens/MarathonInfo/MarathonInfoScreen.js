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
  const getMarathonInfo = async (
    year = new Date().getFullYear(),
    month = 0,
    area = 0,
    closed = true
  ) => {
    console.log("get Data!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    try {
      const response = await apiClient.post(
        `/tournament/tournament/getMarathon`,
        {
          year: year,
          month: month,
          area: area,
          closed: closed,
        }
      );
      setInfos(response.data.data || []); // 데이터가 없을 때 빈 배열로 설정
    } catch (e) {
      console.log("get marathoninfo error:", e);
    }
  };
  useEffect(() => {
    getMarathonInfo();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <Wrapper>
          <Top>
            <MarathonInfoSearchBar
              searchType={"searchInfo"}
              searchFunc={(year, month, area, closed) => {
                alert(
                  `년도: ${year}, 월: ${month}, 지역: ${area}, 접수 상태: ${closed}`
                );
                getMarathonInfo(year, month, area, closed);
              }}
            />
          </Top>
          <Bottom>
            <List>
              {infos.length === 0 ? (
                <Text>검색 조건에 맞는 마라톤이 존재하지 않아요</Text>
              ) : (
                infos.map((info) => (
                  <MarathonInfoPreview
                    key={info.uuid}
                    data={info}
                    mode="searchInfo"
                    navigation={navigation}
                  />
                ))
              )}
            </List>
          </Bottom>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MarathonInfo;
