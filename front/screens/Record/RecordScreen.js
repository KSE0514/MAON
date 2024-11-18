import {
  Wrapper,
  Bottom, 
  List,
} from './RecordScreenStyles'
import useAuthStore from "./../../store/AuthStore"
import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { apiClient } from '../../customAxios';
import RecordInfoPreview from "../../components/RecordInfoPreview/RecordInfoPreview";


const RecordScreen = ({ navigation }) => {
  const { user } = useAuthStore()

  const [info, setInfo] = useState([]);

  useEffect(() => {
    getRecordList()
  }, [])
  
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }


  const getRecordList = async() => {
    try{
      const response = await apiClient.get(
        `/route/record/myRecords`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
          },
        }
      )
      if (response.status === 200) {
        console.log("내 기록 조회 성공: ", response.data.data)
        setInfo(response.data.data)
        console.log("내 기록 조회 성공-첫 번째 요소: ", response.data.data[0])
      }
    } catch(error) {
      console.error("내 기록 조회 에러 발생: ", error)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
    <Wrapper>
        {/* <Text>기록 화면</Text> */}
          <Bottom>
            <List>
              {info.map((data) => (
                <RecordInfoPreview
                  data={data}
                  mode="searchInfo"
                  moveDetail={() => {
                    // routeId랑 같이 보내기

                    navigation.navigate("RecordDetail", {
                      resultData: data,
                      routeId: data.routeId,
                      // searchType: searchType,
                      // mode: mode,
                      // recordId: data.recordId
                    });
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
export default RecordScreen;