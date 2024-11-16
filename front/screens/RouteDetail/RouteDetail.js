import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { useEffect, useState } from "react";
import {
  Bottom,
  Top,
  Wrapper,
  Info,
  Row,
  Rank,
  RunBtn,
  styles,
  RankTitle,
  RankList,
  UserInfo,
} from "./RouteDetailStyle";
import BookmarkBtn from "../../components/Button/BookmarkBtn/BookmarkBtn";
import { BookmarkBtnArea } from "../MarathonInfoDetail/MarathonInfoDetailScreenStyles";
import { getPracticeRoomIdWithRoute } from "../../utils/getRoomId";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCalendarDays,
  faRankingStar,
  faRoute,
} from "@fortawesome/pro-duotone-svg-icons";
import color from "../../styles/colors";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { apiClient } from "../../customAxios";
import MapView, { Polyline } from "react-native-maps";

const RouteDetail = ({ navigation, route }) => {
  const { routeId, searchType, mode, info } = route.params;

  const [marathonInfo, setMarathonInfo] = useState({});
  const [latLongArray, setLatLongArray] = useState([]);

  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  // 초기 데이터 로드
  useEffect(() => {
    try {
      const getDetailInfo = async () => {
        setMarathonInfo(info[0]);
      };
      getDetailInfo();
    } catch (e) {
      console.log("getDetailInfo: ", e);
    }
  }, []);

  // latLongArray 설정
  useEffect(() => {
    if (marathonInfo.track && Array.isArray(marathonInfo.track.coordinates)) {
      const routeArray = marathonInfo.track.coordinates.map((point) => ({
        latitude: point.x,
        longitude: point.y,
      }));
      setLatLongArray(routeArray); // latLongArray 업데이트
    }
  }, [marathonInfo]);

  // 초기 렌더링 방지 (latLongArray가 비어있으면 렌더링 중단)
  if (!latLongArray.length) {
    return <Text>Loading map...</Text>;
  }

  return (
    <ScrollView>
      <Wrapper>
        <Top>
          <MapView
            provider={MapView.PROVIDER_GOOGLE}
            style={{
              height: 350,
              flex: 1,
              alignSelf: "stretch",
              // borderRadius: 20,
            }}
            showsUserLocation={false}
            initialRegion={{
              latitude: latLongArray[0].latitude,
              longitude: latLongArray[0].longitude,
              latitudeDelta: 0.005, // 줌 레벨 설정 (작을수록 줌 인)
              longitudeDelta: 0.005,
            }}>
            <Polyline
              coordinates={latLongArray}
              strokeColor={color.light_orange}
              strokeWidth={6}
            />
          </MapView>
          <BookmarkBtnArea>{/* Bookmark 버튼 */}</BookmarkBtnArea>
        </Top>
        <Bottom>
          <Info>
            <Text style={[styles.boldFont, { fontSize: 28 }]}>
              {marathonInfo.routeName}
            </Text>
            <Row style={{ marginTop: 24 }}>
              <FontAwesomeIcon
                size={20}
                icon={faCalendarDays}
                color={color.grape_fruit}
                secondaryColor={color.light_mandarin}
                swapOpacity={true}
              />
              <Text style={[styles.mediumFont, styles.infoText]}>
                등록일:{" "}
                {new Date(marathonInfo.createdAt)
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\s/g, "")
                  .replace(/\.$/, "")}
              </Text>
            </Row>
            <Row>
              <FontAwesomeIcon
                size={20}
                color={color.grape_fruit}
                icon={faPenToSquare}
              />
              <Text style={[styles.mediumFont, styles.infoText]}>
                등록인: {marathonInfo.writerName}
              </Text>
            </Row>
            <Row>
              <FontAwesomeIcon
                size={20}
                icon={faRoute}
                color={color.light_orange}
              />
              <Text style={[styles.mediumFont, styles.infoText]}>
                코스길이: {marathonInfo.distance}km
              </Text>
            </Row>
          </Info>
          <View style={{ alignItems: "flex-end" }}>
            <RunBtn
              onPress={() => {
                navigation.navigate("RunningWithRoute", {
                  routeId,
                  searchType,
                  mode,
                  marathonInfo,
                  latLongArray,
                });
              }}>
              <Text style={[styles.mediumFont, { color: "white" }]}>
                달리기
              </Text>
            </RunBtn>
          </View>
        </Bottom>
      </Wrapper>
    </ScrollView>
  );
};
export default RouteDetail;
