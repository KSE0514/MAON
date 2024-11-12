import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { useState } from "react";
import ResultDonutChart from "../../components/DonutChart/ResultDonutChart";
import { baseGps } from "../../text_gpx_data";
import {
  AddRouteBtn,
  Col,
  FinishBtn,
  ViewTypeChangeBtn,
  Wrapper,
  styles,
} from "./RunResultStyle";
import color from "../../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faShoePrints,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

const RunResult = ({ navigation, route }) => {
  const { mode, resultData } = route.params || {};
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Wrapper>
        <View style={[styles.routeAddView]}>
          <AddRouteBtn>
            <Text style={[styles.boldFont]}>경로 추가하기</Text>
          </AddRouteBtn>
        </View>
        <View>
          <ResultDonutChart
            mode={mode}
            routeDistance={resultData.routeDistance}
            distance={resultData.distance}
          />
        </View>
        <View>
          <Col>
            <FontAwesomeIcon
              icon={faHeart}
              color={color.light_orange}
              size={25}
            />
            <Text style={[styles.boldFont]}>평균 심박수</Text>
            <Text style={[styles.boldFont]}>{resultData.averageHeartRate}</Text>
          </Col>
          <Col>
            <FontAwesomeIcon icon={faStopwatch} />
            <Text style={[styles.boldFont]}>총 시간</Text>
            <Text style={[styles.boldFont]}>{resultData.runningTime}</Text>
          </Col>
          <Col>
            <FontAwesomeIcon icon={faShoePrints} rotation={270} />
            <Text style={[styles.boldFont]}>평균 페이스</Text>
            <Text style={[styles.boldFont]}>{resultData.averagePace}</Text>
          </Col>
        </View>
        <View>
          <View>
            <ViewTypeChangeBtn>
              <Text style={[styles.boldFont]}>패이스 그래프</Text>
            </ViewTypeChangeBtn>
            <ViewTypeChangeBtn>
              <Text style={[styles.boldFont]}>달리기 경로</Text>
            </ViewTypeChangeBtn>
          </View>
        </View>
        <FinishBtn>
          <Text style={[styles.boldFont]}>완료</Text>
        </FinishBtn>
      </Wrapper>
    </SafeAreaView>
  );
};
export default RunResult;
