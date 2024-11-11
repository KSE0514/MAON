import {
  Wrapper,
  MapArea,
  BookmarkBtnArea,
  ContentArea,
  TitleArea,
  TitleText,
  DetailInfoArea,
  DetailInfoView,
  LineInfoView,
  LineInfoText,
  BtnArea,
  HalfBtnContainer,
  BtnHalfArea,
  TeamTitleArea,
  TeamContainer,
  TeamTitleText,
  AddUserView,
  AddUserText,
  TeamListArea,
} from "./MarathonInfoDetailScreenStyles";
import { useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import BookmarkBtn from "../../components/Button/BookmarkBtn/BookmarkBtn";
import MarathonInfoDetailIcon from "../../components/MarathonInfoDetailIcon/MarathonInfoDetailIcon";
import RoundBtn from "../../components/Button/RoundBtn/RoundBtn";
import SelectModal from "../../components/Modal/SelectModal/SelectModal";
import MarathonDetailRoundBtn from "../../components/Button/MarathonDetailRoundBtn/MarathonDetailRoundBtn";
import UserInfoBox from "../../components/Button/UserInfoBox/UserInfoBox";

import { Text, View, Image, ScrollView } from "react-native";
import testImg from "./../../assets/images/testProfile2.jpg";
import testImg1 from "./../../assets/images/testProfile1.jpg";
import testImg2 from "./../../assets/images/testProfile.jpg";
import color from "../../styles/colors";

// /////////////////// 테스트용
const testMyInfo = {
  marathonList: {
    "2024 국제 국민 마라톤": {
      teamCode: 1,
      // teamCode: null,
    },
  },
  bookmarkList: ["2024 국제 국민 마라톤"],
};

const testMyInfo2 = {
  marathonList: {},
  bookmarkList: [],
};

const testMarathonInfo = {
  name: "2024 국제 국민 마라톤",
  date: "2024-11-18",
  period: "2024.09.20 ~ 2024.09.25",
  place: "여의도 공원 문화의 마당",
  url: "http://국민마라톤.com",
  course: ["하프", "10km", "3.6km"],
  host: "무안군체육회, 전국 마라톤 협회",
  callNum: "061.0000.0000",
};

const testUsers = [
  {
    userNickName: "마미남",
    userProfileImg: testImg,
    marathonName: "무안 마라톤",
    level: 5,
    teamCode: null,
    userStatus: "요청하기", // 참여중인 팀 없음
  },
  {
    userNickName: "신라의 달밤",
    userProfileImg: testImg1,
    marathonName: "무안 마라톤",
    level: 3,
    teamCode: null,
    userStatus: "요청하기", // 참여중인 팀 없음
  },
  {
    userNickName: "참여중인 팀 있음-우리팀",
    userProfileImg: testImg1,
    marathonName: "무안 마라톤",
    level: 5,
    teamCode: 1,
    userStatus: true, // 참여중인 팀 있음
  }, // 백 쪽에서 팀에 참여중이지 않은 사람 리스트만 뽑아서 보내주면 될듯
  {
    userNickName: "치즈 덕덕-우리팀",
    userProfileImg: testImg2,
    marathonName: "무안 마라톤",
    level: 2,
    teamCode: 1,
    userStatus: "요청하기", // 참여중인 팀 없음
  },
  {
    userNickName: "치즈 덕덕2",
    userProfileImg: testImg2,
    marathonName: "무안 마라톤",
    level: 5,
    teamCode: null,
    userStatus: "수락대기", // 참여중인 팀 없음
  },
  {
    userNickName: "우리 팀",
    userProfileImg: testImg,
    marathonName: "무안 마라톤",
    level: 5,
    teamCode: 1,
    userStatus: "show-detail", // 참여중인 팀 없음
  },
];
// ///////////////////

const MarathonInfoDetailScreen = ({ navigation, uuid }) => {
  const [myMarathonInfo, setMyMarathonInfo] = useState(testMyInfo);
  const [isActivated, setIsActived] = useState(false); // 북마크 여부
  const [showSelectCourseModal, setShowSelectCourseModal] = useState(false); // 모달
  const [runType, setRunType] = useState("");

  const [marathonName, setMarathonName] = useState("");
  const [marathonDate, setMarathonDate] = useState("");
  const [marathonFormatDate, setMarathonFormatDate] = useState("");
  const [marathonPeriod, setMarathonPeriod] = useState("");
  const [marathonPlace, setMarathonPlace] = useState("");
  const [marathonUrl, setMarathonUrl] = useState("");
  const [marathonCourse, setMarathonCourse] = useState([]);
  const [marathonHost, setMarathonHost] = useState("");
  const [marathonCallNum, setMarathonCallNum] = useState("");

  const [dDay, setDDay] = useState(null); // 마라톤 시작 디데이
  const [showWarning, setShowWarning] = useState(false); // 경고 메시지 표시 상태

  const [teamMemberList, setTeamMemberList] = useState([]); // 팀원들
  const [myTeamCode, setMyTeamCode] = useState(1); // 내 팀 코드

  // 코스 선택 모달 내용
  // 코스 선택 모달 내용
  const [selectCourseModalContent, setSelectCourseModalContent] = useState({
    text: `참가 종목을 선택하세요.`,
    subText: "",
    buttons: [
      {
        title: "취소",
        onPress: () => {
          setShowSelectCourseModal(false);
        },
      },
      {
        title: "신청",
        onPress: () => {
          console.log("정보 확인용:", selectCourseModalContent);
          // entryMarathon()
        },
      },
    ],
    item: [], // 초기 상태
  });

  useEffect(() => {
    // marathonCourse와 selectCourseModalContent를 함께 업데이트
    const updatedCourse = testMarathonInfo.course;
    setMarathonCourse(updatedCourse);

    // 코스 데이터가 있을 경우에만 selectCourseModalContent 업데이트
    if (updatedCourse.length > 0) {
      setSelectCourseModalContent((prevContent) => ({
        ...prevContent,
        item: updatedCourse.map((course) => ({ label: course, value: course })),
      }));
    }
  }, []);

  console.log("선택 가능한 코스:", selectCourseModalContent.item); // 디버깅용

  // console.log('북마크 활성화 여부:',isActivated, myMarathonInfo)

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
    const calculateDDay = () => {
      // 마라톤 날짜를 Date 객체로 변환
      const marathonDateObj = new Date(marathonDate); // 예시로 사용
      const currentDate = new Date(); // 현재 날짜

      // 두 날짜의 차이 (밀리초 단위)
      const timeDifference = marathonDateObj - currentDate;

      // 밀리초를 일 단위로 변환
      const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // D-Day 값 업데이트
      setDDay(dayDifference);
    };

    calculateDDay(); // D-Day 계산 함수 호출
  }, [marathonDate]);

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

    // setTeamMemberList(testUsers)
    // 나와 같은 팀인 팀원들 필터링해서 teamMemberList에 저장하기
    const filteredTeamMembers = testUsers.filter(
      (user) => user.teamCode === myTeamCode
    );
    setTeamMemberList(filteredTeamMembers);
  }, []);

  // 팀 생성 및 인원 추가 버튼
  const createTeam = () => {
    navigation.navigate("CreateTeam");
  };

  // 코스선택 모달에서 신청 버튼- km정보 어떻게 담아서 넘길지 고민하기
  const entryMarathon = () => {
    console.log(selectCourseModalContent);
    console.log(selectCourseModalContent.item);
    console.log(runType);
    if (runType !== "") {
      navigation.navigate("MarathonEntryForm");
    }
  };

  // 시작일이 아닌데 시작 버튼을 눌렀을 경우
  const handleNotStartedWarning = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2000); // 2초 후 경고 메시지 숨김
  };

  return (
    <Wrapper>
      <ScrollView>
        {/* 지도 영역 */}
        <MapArea>
          <Image
            // style={{height: '100%'}}
            source={testImg}
          />
          <BookmarkBtnArea>
            <BookmarkBtn
              text={"경로 북마크"}
              isActivated={isActivated}
              toggleBookmark={toggleBookmark}
            />
          </BookmarkBtnArea>
        </MapArea>

        <ContentArea>
          <TitleArea>
            {marathonName && <TitleText>{marathonName}</TitleText>}
          </TitleArea>
          <DetailInfoArea>
            <DetailInfoView>
              {marathonDate && (
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={"date"} />
                  <LineInfoText>대회 일시: {marathonFormatDate}</LineInfoText>
                </LineInfoView>
              )}
              {marathonPeriod && (
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={"period"} />
                  <LineInfoText>접수 기간: {marathonPeriod}</LineInfoText>
                </LineInfoView>
              )}
              {marathonPlace && (
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={"location"} />
                  <LineInfoText>대회 장소: {marathonPlace}</LineInfoText>
                </LineInfoView>
              )}
              {marathonUrl && (
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={"url"} />
                  <LineInfoText>홈페이지: {marathonUrl}</LineInfoText>
                </LineInfoView>
              )}
              {marathonCourse && (
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={"course"} />
                  <LineInfoText>
                    대회 종목: {marathonCourse.join(", ")}
                  </LineInfoText>
                </LineInfoView>
              )}
              {marathonHost && (
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={"host"} />
                  <LineInfoText>주최: {marathonHost}</LineInfoText>
                </LineInfoView>
              )}
              {marathonCallNum && (
                <LineInfoView>
                  <MarathonInfoDetailIcon iconName={"callNum"} />
                  <LineInfoText>문의: {marathonCallNum}</LineInfoText>
                </LineInfoView>
              )}

              {/* 팀이 있을 경우 팀원 리스트 출력 */}
              {/* 유저가 참가 신청했다는 것도 조건으로 추가하기 */}
              {teamMemberList.length > 0 ? (
                <TeamContainer>
                  <TeamTitleArea>
                    <TeamTitleText>Team</TeamTitleText>
                    <AddUserView
                      onPress={() => navigation.navigate("CreateTeam")}>
                      <AddUserText>인원추가</AddUserText>
                    </AddUserView>
                  </TeamTitleArea>

                  {/* 팀원들 */}
                  <TeamListArea>
                    {teamMemberList.map((user) => (
                      <UserInfoBox
                        proImg={user.userProfileImg}
                        level={user.level}
                        name={user.userNickName}
                        status={"show-detail"}
                        onPress={() => console.log("사용자 디테일창")}
                      />
                    ))}
                  </TeamListArea>
                </TeamContainer>
              ) : null}

              {/* 버튼 */}
              {myMarathonInfo?.marathonList &&
              marathonName in myMarathonInfo.marathonList ? (
                myMarathonInfo.marathonList[marathonName].teamCode ? (
                  <BtnArea>
                    <RoundBtn
                      text={dDay === 0 ? "시작하기" : `D - ${dDay}`}
                      onPress={
                        dDay === 0
                          ? () => console.log("시작하기 버튼 누름")
                          : handleNotStartedWarning
                      }
                    />
                    <View style={{ marginTop: 15, marginBottom: 30 }}>
                      {showWarning && (
                        <Text style={{ color: color.nav_orange }}>
                          아직 마라톤을 시작할 수 없습니다.
                        </Text>
                      )}
                    </View>
                  </BtnArea>
                ) : (
                  <BtnArea>
                    <HalfBtnContainer>
                      <BtnHalfArea>
                        <MarathonDetailRoundBtn
                          text={"팀 생성"}
                          onPress={createTeam}
                        />
                      </BtnHalfArea>
                      <BtnHalfArea>
                        {/* 시작하기 눌렀을 때 어디로 넘어갈지 생각하기 */}
                        <MarathonDetailRoundBtn
                          text={dDay === 0 ? "시작하기" : `D - ${dDay}`}
                          backColor={"o_btn"}
                          onPress={
                            dDay === 0
                              ? () => console.log("시작하기 버튼 누름")
                              : handleNotStartedWarning
                          }
                        />
                      </BtnHalfArea>
                    </HalfBtnContainer>
                    <View style={{ marginTop: 15, marginBottom: 30 }}>
                      {showWarning && (
                        <Text style={{ color: color.nav_orange }}>
                          아직 마라톤을 시작할 수 없습니다.
                        </Text>
                      )}
                    </View>
                  </BtnArea>
                )
              ) : (
                <BtnArea>
                  <RoundBtn
                    text={"참가 신청하기"}
                    onPress={() => setShowSelectCourseModal(true)}
                  />
                </BtnArea>
              )}
            </DetailInfoView>
          </DetailInfoArea>
        </ContentArea>
      </ScrollView>
      {showSelectCourseModal && selectCourseModalContent.item.length > 0 && (
        <SelectModal
          isVisible={showSelectCourseModal}
          content={selectCourseModalContent}
          setRunType={setRunType}
        />
      )}
    </Wrapper>
  );
};

export default MarathonInfoDetailScreen;
