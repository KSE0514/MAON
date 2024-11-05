import {
  Wrapper
} from "./ChallengeScreenStyles"

import { SafeAreaView, View, Text, Button, TouchableOpacity } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
const ChallengeScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper>
      <View>
      <Text>챌린지 화면</Text>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{fontSize: 30}}>로그인 화면</Text>
          </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyPage");
            }}
          >
            <Text style={{fontSize: 30}}>마이페이지</Text>
          </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateTeam");
            }}
          >
            <Text style={{fontSize: 30}}>팀 생성</Text>
          </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("MarathonEntryForm");
            }}
          >
            <Text style={{fontSize: 30}}>마라톤 신청서</Text>
          </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("MarathonInfoDetail");
            }}
          >
            <Text style={{fontSize: 30}}>마라톤 정보 디테일</Text>
          </TouchableOpacity>

      </View>
    </Wrapper>
  );
};
export default ChallengeScreen;