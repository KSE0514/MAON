import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import { useFontsLoaded } from "../../utils/fontContext";
import { OptionTitle, Wrapper } from "./MarathonInfoSearchBarStyle";
import Slider from "@react-native-community/slider";

const MarathonInfoSearchBar = ({ mode, onPress }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  const [distance, setDistance] = useState(0); // 초기 슬라이더 값 설정
  return (
    <Wrapper>
      <OptionTitle>거리선택</OptionTitle>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={100}
        step={1} // 1씩 증가/감소
        value={distance} // 현재 슬라이더 값
        onValueChange={(newValue) => setDistance(newValue)} // 값이 변경될 때 호출
        minimumTrackTintColor="#FF6347" // 최소값 트랙 색상
        maximumTrackTintColor="#000000" // 최대값 트랙 색상
        thumbTintColor="#FF6347" // 슬라이더 핸들 색상
      />
      {mode == "run" && (
        <>
          <OptionTitle>코스 선택</OptionTitle>
        </>
      )}
      {mode == "searchInfo" && <></>}
    </Wrapper>
  );
};
export default MarathonInfoSearchBar;
