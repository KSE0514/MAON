import {
  Wrapper
} from "./ChallengeScreenStyles"

import { SafeAreaView, View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
const testMode = true


const ChallengeScreen = ({ navigation }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper>
      {testMode?
      <ScrollView>
        <Svg width="321" height="240" viewBox="0 0 321 240" fill="none">
        <Path
          d="M200.878 5.36357L0.5 111.5V239.5H430V111.5L237.956 5.67049C226.439 -0.676224 212.499 -0.791624 200.878 5.36357Z"
          fill="url(#paint0_linear_2006_177)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_2006_177"
            x1="105"
            y1="78"
            x2="289.5"
            y2="142"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FDD048" />
            <Stop offset="1" stopColor="#FF740E" />
          </LinearGradient>
        </Defs>
      </Svg>


      <Svg width="234" height="415" viewBox="0 0 234 415" fill="none">
        <Path
          d="M-120 0.5L233.5 197.5V415H-120V0.5Z"
          fill="url(#paint0_linear_2006_176)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_2006_176"
            x1="151.5"
            y1="245.5"
            x2="64"
            y2="142.5"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FA9987" />
            <Stop offset="1" stopColor="#FA7514" />
          </LinearGradient>
        </Defs>
      </Svg>




      <Svg width="391" height="402" viewBox="0 0 391 402" fill="none">
        <Path
          d="M-190 402L391 0V402H-190Z"
          fill="url(#paint0_linear_2006_175)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_2006_175"
            x1="263"
            y1="90"
            x2="375"
            y2="259.5"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FA9987" />
            <Stop offset="0.128584" stopColor="#FA9987" />
            <Stop offset="1" stopColor="#A76251" />
          </LinearGradient>
        </Defs>
      </Svg>



      <Svg width="391" height="575" viewBox="0 0 391 575" fill="none">
        <Path
          d="M-1 574.5V0L102.425 73.0873C107.939 76.9832 115.234 77.2479 121.015 73.7617L161.422 49.3945C170.838 43.7158 182.758 44.3152 191.557 50.9098L400.5 207.5V574.5H-1Z"
          fill="url(#paint0_linear_2006_174)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_2006_174"
            x1="119"
            y1="204.5"
            x2="107"
            y2="88"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FFC48D" />
            <Stop offset="1" stopColor="#FF6A0E" />
          </LinearGradient>
        </Defs>
      </Svg>




      <Svg width="391" height="707" viewBox="0 0 391 707" fill="none">
        <Path
          d="M162.735 9.74298L-1 193.5V706.5H393V193.5L204.72 8.35785C192.901 -3.26409 173.762 -2.63268 162.735 9.74298Z"
          fill="url(#paint0_linear_2006_173)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_2006_173"
            x1="196"
            y1="-13"
            x2="196"
            y2="706.5"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#A24945" />
            <Stop offset="0.331" stopColor="#FFC58E" />
          </LinearGradient>
        </Defs>
      </Svg>
      </ScrollView>
      
      :
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
      
      }
    </Wrapper>
  );
};
export default ChallengeScreen;