import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useFontsLoaded } from "../../utils/fontContext";
import {
  OptionTitle,
  SearchButton,
  Wrapper,
  Top,
  Middle,
  Bottom,
  SelectView,
  styles,
  pickerSelectStyles,
} from "./MarathonInfoSearchBarStyle";
import Slider from "@react-native-community/slider";
import { RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import color from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";

const MarathonInfoSearchBar = ({ mode, onPress, searchType }) => {
  const fontsLoaded = useFontsLoaded();
  const [routeType, setRouteType] = useState("");
  const [routeName, setRouteName] = useState("");
  const [year, setYear] = useState("전체년도");
  const [month, setMonth] = useState("전체월");
  const [region, setRegion] = useState("지역");
  const years = [
    { label: "전체년도", value: "all" },
    { label: "2024년", value: "2024" },
    { label: "2025년", value: "2025" },
    { label: "2026년", value: "2026" },
    { label: "2027년", value: "2027" },
    { label: "2028년", value: "2028" },
  ];
  const months = [
    { label: "전체월", value: "all" },
    { label: "1월", value: "1" },
    { label: "2월", value: "2" },
    { label: "3월", value: "3" },
    { label: "4월", value: "4" },
    { label: "5월", value: "5" },
    { label: "6월", value: "6" },
    { label: "7월", value: "7" },
    { label: "8월", value: "8" },
    { label: "9월", value: "9" },
    { label: "10월", value: "10" },
    { label: "11월", value: "11" },
    { label: "12월", value: "12" },
  ];
  const regions = [{ label: "지역", value: "all" }];
  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  const [distance, setDistance] = useState(0); // 초기 슬라이더 값 설정
  return (
    <Wrapper style={styles.shadow}>
      <Top>
        <OptionTitle>거리선택 {distance}km</OptionTitle>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={43}
          step={1} // 1씩 증가/감소
          value={distance} // 현재 슬라이더 값
          onValueChange={(newValue) => setDistance(newValue)} // 값이 변경될 때 호출
          minimumTrackTintColor={color.light_orange} // 선택된 트랙 색상
          maximumTrackTintColor="#E0E0E0" // 선택되지 않은 트랙 색상
          thumbTintColor="transparent" // thumb 색상 투명으로 설정
        />
      </Top>
      {searchType == "run" && (
        <>
          <Middle>
            <OptionTitle>코스 선택</OptionTitle>
            <RadioButton.Group
              onValueChange={(value) => setRouteType(value)}
              value={routeType}>
              <View style={styles.radioButtonContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="myRoute" />
                  <Text style={styles.radioBoxText}>내 코스</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="bookMarkRoute" />
                  <Text style={styles.radioBoxText}>북마크한 코스</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="marathonRoute" />
                  <Text style={styles.radioBoxText}>마라톤 코스</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="generalRoute" />
                  <Text style={styles.radioBoxText}>일반 코스</Text>
                </View>
              </View>
            </RadioButton.Group>
          </Middle>
          <Bottom>
            <TextInput
              style={styles.input}
              placeholder="코스명을 입력해주세요"
              value={routeName}
              onChangeText={setRouteName}
            />
            <LinearGradient
              colors={["#FF740E", "#FFA646"]} // 시작 색상과 끝 색상 설정
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}>
              <SearchButton
                onPress={() => {
                  alert("검색버튼 눌림");
                }}>
                <Text style={styles.buttonText}>검색</Text>
              </SearchButton>
            </LinearGradient>
          </Bottom>
        </>
      )}
      {searchType == "searchInfo" && (
        <>
          <Middle style={{ paddingTop: 0, paddingBottom: 20 }}>
            <SelectView>
              <RNPickerSelect
                onValueChange={(value) => setYear(value)}
                items={years}
                value={year}
                style={pickerSelectStyles} // 커스텀 스타일 적용
                placeholder={{}}></RNPickerSelect>
              <RNPickerSelect
                onValueChange={(value) => setMonth(value)}
                items={months}
                value={month}
                style={pickerSelectStyles} // 커스텀 스타일 적용
                placeholder={{}}></RNPickerSelect>
              <RNPickerSelect
                onValueChange={(value) => setRegion(value)}
                items={regions}
                value={region}
                style={pickerSelectStyles} // 커스텀 스타일 적용
                placeholder={{}}></RNPickerSelect>
            </SelectView>
          </Middle>
          <Bottom>
            <View style={{ flex: 4 }}>
              <RadioButton.Group
                onValueChange={(value) => setRouteType(value)}
                value={routeType}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="possible" />
                  <Text style={styles.radioBoxText}>접수 가능한 마라톤</Text>
                </View>
              </RadioButton.Group>
            </View>
            <LinearGradient
              colors={["#FF740E", "#FFA646"]} // 시작 색상과 끝 색상 설정
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradient]}>
              <SearchButton
                onPress={() => {
                  alert("검색버튼 눌림");
                }}>
                <Text style={styles.buttonText}>검색</Text>
              </SearchButton>
            </LinearGradient>
          </Bottom>
        </>
      )}
    </Wrapper>
  );
};
export default MarathonInfoSearchBar;
