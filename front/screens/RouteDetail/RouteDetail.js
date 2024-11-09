import { SafeAreaView, View, Text, ScrollView, Image } from "react-native";
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

// /////////////////// 테스트용
const testMyInfo = {
  marathonList: {
    "2024 국제 국민 마라톤": {},
  },
  bookmarkList: ["2024 국제 국민 마라톤"],
};

const testMarathonInfo = {
  name: "2024 국제 국민 마라톤",
  date: "2024-11-18",
  course: ["5km"],
  host: "무안군체육회, 전국 마라톤 협회",
};

const users = [
  // {
  //   username: "이예빈",
  //   profile: "testProfile.jpg",
  //   time: "01:12:14",
  // },
  // {
  //   username: "정유진",
  //   profile: "testProfile1.jpg",
  //   time: "01:15:35",
  // },
  // {
  //   username: "김성은",
  //   profile: "testProfile2.jpg",
  //   time: "01:21:23",
  // },
];
const images = {
  "testProfile.jpg": require("../../assets/images/testProfile.jpg"),
  "testProfile1.jpg": require("../../assets/images/testProfile1.jpg"),
  "testProfile2.jpg": require("../../assets/images/testProfile2.jpg"),
};

const RouteDetail = ({ navigation, routeId }) => {
  const [isActivated, setIsActived] = useState(false); // 북마크 여부
  const [marathonName, setMarathonName] = useState("");
  const [marathonDate, setMarathonDate] = useState("");
  const [marathonFormatDate, setMarathonFormatDate] = useState("");
  const [marathonPeriod, setMarathonPeriod] = useState("");
  const [marathonPlace, setMarathonPlace] = useState("");
  const [marathonUrl, setMarathonUrl] = useState("");
  const [marathonCourse, setMarathonCourse] = useState([]);
  const [marathonHost, setMarathonHost] = useState("");
  const [marathonCallNum, setMarathonCallNum] = useState("");
  const [myMarathonInfo, setMyMarathonInfo] = useState(testMyInfo);
  const [runType, setRunType] = useState("");

  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  //routeId로 랭킹 데이터 /  가져오기

  // 북마크 버튼 토글
  const toggleBookmark = () => {
    const marathonName = testMarathonInfo.name;

    setMyMarathonInfo((prevState) => {
      const isBookmarked = prevState.bookmarkList.includes(marathonName);

      return {
        ...prevState,
        bookmarkList: isBookmarked
          ? prevState.bookmarkList.filter((name) => name !== marathonName)
          : [...prevState.bookmarkList, marathonName],
      };
    });

    setIsActived((prev) => !prev); // 북마크 상태 토글
  };

  useEffect(() => {
    setMyMarathonInfo(testMyInfo);

    const maraName = testMarathonInfo.name;
    // 사용자의 북마크 목록에 해당 마라톤이 있는지 확인
    setIsActived(testMyInfo.bookmarkList.includes(maraName));

    setRunType(""); // 선택 타입 초기화

    // 날짜 형식을 'YYYY.MM.DD'로 변환
    const formattedDate = testMarathonInfo.date.split("-").join(".");
    setMarathonFormatDate(formattedDate);

    // isActived 초기값 확인용
    console.log(
      "isActived 초기값 확인용",
      testMyInfo.bookmarkList.includes(maraName)
    );
    setMarathonName(maraName);
    setMarathonDate(testMarathonInfo.date);
    setMarathonPeriod(testMarathonInfo.period);
    setMarathonPlace(testMarathonInfo.place);
    setMarathonUrl(testMarathonInfo.url);
    setMarathonCourse(testMarathonInfo.course);
    setMarathonHost(testMarathonInfo.host);
    setMarathonCallNum(testMarathonInfo.callNum);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <Wrapper>
          <Top>
            <Image
              source={require("../../assets/images/largeRoute.png")} // 로컬 이미지 경로
            />
            <BookmarkBtnArea>
              <BookmarkBtn
                text={"경로 북마크"}
                isActivated={isActivated}
                toggleBookmark={toggleBookmark}
              />
            </BookmarkBtnArea>
            <View></View>
          </Top>
          <Bottom>
            <Info>
              <Text style={[styles.boldFont, { fontSize: 28 }]}>
                2024 국제 국민 마라톤
              </Text>
              <Row style={{ marginTop: 24 }}>
                <FontAwesomeIcon
                  size={20}
                  icon={faCalendarDays}
                  color={color.grape_fruit}
                  secondaryColor={color.light_mandarin}
                  swapOpacity={true} // 필요에 따라 두 색상 간의 불투명도 조정
                />
                <Text style={[styles.mediumFont, styles.infoText]}>
                  등록날짜: 2024.11.07
                </Text>
              </Row>
              <Row>
                <FontAwesomeIcon
                  size={20}
                  color={color.grape_fruit}
                  icon={faPenToSquare}
                />
                <Text style={[styles.mediumFont, styles.infoText]}>
                  등록인: 이예빈
                </Text>
              </Row>
              <Row>
                <FontAwesomeIcon
                  size={20}
                  icon={faRoute}
                  color={color.light_orange}
                />
                <Text style={[styles.mediumFont, styles.infoText]}>
                  코스길이: 5km
                </Text>
              </Row>
            </Info>
            <View style={{ alignItems: "flex-end" }}>
              <RunBtn
                onPress={async () => {
                  // const roomId = await getPracticeRoomIdWithRoute();
                  // navigation.navigate("RunningWithRoute", { roomId: roomId });
                  navigation.navigate("RunningWithRoute");
                }}
              >
                <Text style={[styles.mediumFont, { color: "white" }]}>
                  달리기
                </Text>
              </RunBtn>
            </View>

            <Rank>
              <RankTitle>
                <FontAwesomeIcon
                  icon={faRankingStar}
                  size={35}
                  color={color.light_orange}
                />
                <Text
                  style={[
                    styles.boldFont,
                    { fontSize: 20, marginLeft: 10, color: color.light_orange },
                  ]}
                >
                  랭킹
                </Text>
              </RankTitle>
              <RankList>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <UserInfo key={index}>
                      <View
                        style={{
                          width: 60,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.rankNumber}>{index + 1}</Text>
                      </View>
                      <View>
                        <Image
                          style={styles.userProflie}
                          source={images[user.profile]}
                        />
                      </View>
                      <View
                        style={{
                          flex: 4,
                          marginLeft: 20,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Text
                          style={[
                            styles.boldFont,
                            { fontSize: 18, marginTop: 6, marginBottom: 8 },
                          ]}
                        >
                          {user.username}
                        </Text>
                        <Text style={[styles.mediumFont, { fontSize: 16 }]}>
                          {user.time}
                        </Text>
                      </View>
                    </UserInfo>
                  ))
                ) : (
                  <Text style={[styles.boldFont, { fontSize: 16 }]}>
                    {`해당 경로에 대한 랭킹이 존재하지않습니다.`}
                  </Text>
                )}
              </RankList>
            </Rank>
          </Bottom>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RouteDetail;
