import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { useEffect, useState } from "react";
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
  faStopwatch,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import fonts from "../../styles/fonts";
import MapView, { Polyline } from "react-native-maps";
import MapStyle from "../../components/Map/MapStyle";
import { apiClient } from "../../customAxios";
import SquareBtn from "../../components/Button/SquareBtn/SquareBtn";

const RunResult = ({ navigation, route }) => {
  const { mode, resultData, recordId } = route.params || {};
  const fontsLoaded = useFontsLoaded();
  const [seePaceChart, setSeePaceChart] = useState(true);
  const routeList = resultData.recordedTrack;
  const [coordinates, setCoordinates] = useState([]);

  const [polyLineLoading, setPolyLineLoading] = useState(true);

  useEffect(() => {
    const transformedCoordinates = routeList.map((point) => ({
      latitude: point.x, // 위도
      longitude: point.y, // 경도
    }));

    setCoordinates(transformedCoordinates); // 변환된 좌표 설정
  }, []);
  useEffect(() => {
    setPolyLineLoading(false); // 로딩 완료
  }, [coordinates]);
  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  const addRoute = async () => {
    try {
      const response = await apiClient.post(`/route/course/create`, {
        writerId: "현석",

        writerName: "현석",

        routeName: "예빈의 싸피 루트 ^3^",

        recordId: recordId,
      });
      console.log(response);
    } catch (e) {
      console.log("Add Route Error: " + e);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Wrapper>
        <View style={[styles.routeAddView]}>
          <AddRouteBtn
            onPress={() => {
              addRoute();
            }}
          >
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
        <View style={styles.infoList}>
          <Col>
            <FontAwesomeIcon
              icon={faHeart}
              color={color.light_orange}
              size={25}
            />
            <Text style={[styles.boldFont, styles.infoTitle]}>평균 심박수</Text>
            <Text style={[styles.boldFont]}>{resultData.averageHeartRate}</Text>
          </Col>
          <Col>
            <FontAwesomeIcon
              icon={faStopwatch}
              size={25}
              color={color.light_orange}
            />
            <Text style={[styles.boldFont, styles.infoTitle]}>총 시간</Text>
            <Text style={[styles.boldFont]}>{resultData.runningTime}</Text>
          </Col>
          <Col>
            <FontAwesomeIcon
              style={{ transform: [{ rotate: "270deg" }] }} // 270도 회전
              icon={faShoePrints}
              size={25}
              color={color.light_orange}
            />
            <Text style={[styles.boldFont, styles.infoTitle]}>평균 페이스</Text>
            <Text style={[styles.boldFont]}>{resultData.averagePace}</Text>
          </Col>
        </View>
        <View>
          <View style={[styles.tab]}>
            <ViewTypeChangeBtn
              onPress={() => {
                setSeePaceChart(true);
              }}
            >
              <Text
                style={[
                  styles.boldFont,
                  { color: seePaceChart ? color.light_orange : "black" },
                ]}
              >
                페이스 그래프
              </Text>
            </ViewTypeChangeBtn>
            <View style={[styles.bar]}></View>
            <ViewTypeChangeBtn
              onPress={() => {
                setSeePaceChart(false);
              }}
            >
              <Text
                style={[
                  styles.boldFont,
                  { color: !seePaceChart ? color.light_orange : "black" },
                ]}
              >
                달리기 경로
              </Text>
            </ViewTypeChangeBtn>
          </View>
        </View>
        <View style={{ marginBottom: 20, flex: 1 }}>
          {seePaceChart ? (
            <></>
          ) : (
            <View style={{ flex: 1 }}>
              <MapView
                provider={MapView.PROVIDER_GOOGLE}
                customMapStyle={MapStyle}
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  borderRadius: 20,
                }}
                showsUserLocation={false}
                initialRegion={{
                  latitude: routeList[0].x, // 위도 설정
                  longitude: routeList[0].y,
                  latitudeDelta: 0.005, // 줌 레벨 설정 (작을수록 줌 인)
                  longitudeDelta: 0.005,
                }}
              >
                {polyLineLoading ? (
                  <></>
                ) : (
                  <Polyline
                    coordinates={coordinates} // 변환된 좌표 배열 전달
                    strokeColor="#FF5733" // 원하는 색상 (예: 주황색)
                    strokeWidth={4} // 선 두께 설정
                  />
                )}
              </MapView>
            </View>
          )}
        </View>

        <SquareBtn
          text="완료"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </Wrapper>
    </SafeAreaView>
  );
};
export default RunResult;
