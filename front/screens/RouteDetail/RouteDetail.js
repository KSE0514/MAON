import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { useEffect, useState } from "react";
import { Bottom, Top, Wrapper } from "./RouteDetailStyle";
import BookmarkBtn from "../../components/Button/BookmarkBtn/BookmarkBtn";
import { BookmarkBtnArea } from "../MarathonInfoDetail/MarathonInfoDetailScreenStyles";

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
            <BookmarkBtnArea>
              <BookmarkBtn
                text={"경로 북마크"}
                isActivated={isActivated}
                toggleBookmark={toggleBookmark}
              />
            </BookmarkBtnArea>
            <View></View>
            <TouchableOpacity>
              <Text>달리기</Text>
            </TouchableOpacity>
          </Top>
          <Bottom>
            <Text></Text>
            <Row>
              <Text>등록날찌:</Text>
            </Row>
            <Row>
              <Text>등록인:</Text>
            </Row>
            <Row>
              <Text>코스길이:</Text>
            </Row>
          </Bottom>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RouteDetail;
