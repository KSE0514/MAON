import {
  Wapper,
  Container,
  ListContainer,
  TitleArea,
  TitleText,
  SearchBarArea,
  ListView,
  UserInfoBoxView,
  BackBtn,
  FollowerBtn,
  FollowerBtnText,
} from "./CreateTeamScreenStyles"
import { FlatList } from 'react-native';
import HeaderNavigation from "../../components/HeaderNavigation/HeaderNavigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserInfoBox from "../../components/Button/UserInfoBox/UserInfoBox";
import { useState, useEffect } from "react";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import {  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// import testImg from './../../assets/images/testProfile2.jpg'
// import testImg1 from "./../../assets/images/testProfile1.jpg"
// import testImg2 from "./../../assets/images/testProfile.jpg"

const testImg = require('./../../assets/images/testProfile2.jpg')
const testImg1 = require("./../../assets/images/testProfile1.jpg")
const testImg2 = require("./../../assets/images/testProfile.jpg")

const testMyInfo2 = {
  marathonList: {
    '무안 마라톤' : {
      teamCode: '이미 참여중인 팀 명',
    }
  }
}

const testUsers = [
  {
  userNickName: '마미남',
  userProfileImg: testImg,
  marathonName: '무안 마라톤',
  level: 5,
  teamCode: null,
  userStatus: '요청하기', // 참여중인 팀 없음
  },
  {
  userNickName: '신라의 달밤',
  userProfileImg: testImg1,
  marathonName: '무안 마라톤',
  level: 3,
  teamCode: null,
  userStatus: '요청하기', // 참여중인 팀 없음
  },
  // {
  // userNickName: '참여중인 팀 있음',
  // userProfileImg: testImg1,
  // marathonName: '무안 마라톤',
  // level: 5,
  // teamCode: 1,
  // userStatus: true, // 참여중인 팀 있음
  // }, // 백 쪽에서 팀에 참여중이지 않은 사람 리스트만 뽑아서 보내주면 될듯
  {
  userNickName: '치즈 덕덕',
  userProfileImg: testImg2,
  marathonName: '무안 마라톤',
  level: 2,
  teamCode: null,
  userStatus: '요청하기', // 참여중인 팀 없음
  },
  {
  userNickName: '치즈 덕덕2',
  userProfileImg: testImg2,
  marathonName: '무안 마라톤',
  level: 5,
  teamCode: null,
  userStatus: '수락대기', // 참여중인 팀 없음
  },
  {
  userNickName: '우리 팀',
  userProfileImg: testImg,
  marathonName: '무안 마라톤',
  level: 5,
  teamCode: null,
  userStatus: 'show-detail', // 참여중인 팀 없음
  },
]


const CreateTeamScreen = ({navigation}) => {
  const [searchName, setSearchName] = useState('') // 사용자가 입력할 값을 담을 state변수

  const [recipientIndex, setRecipientIndex] = useState(null)  // 초기값을 null로 설정
  const [showSendRequestModal, setShowSendRequestModal] =useState(false)
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([]); // 필터링된 사용자 리스트

  useEffect(() => {
    setMembers(testUsers)
    setFilteredMembers(testUsers); // 초기 필터링된 사용자 리스트 설정
  }, [])

  useEffect(() => {
    // searchName이 변경될 때마다 필터링
    const filtered = members.filter(member =>
      member.userNickName.includes(searchName)
    );
    setFilteredMembers(filtered);
  }, [searchName, members]);

  // 팀 참여 요청
  const sendRequestContent = recipientIndex !== null && recipientIndex >= 0 && recipientIndex < members.length
  ? {
      text: `'${filteredMembers[recipientIndex].userNickName}'님에게\n요청을 보내겠습니까?`,
      subText: "",
      buttons: [
        {
          title: "취소",
          onPress: () => {
            cancelBtn()
            // setShowSendRequestModal(false);
          },
        },
        {
          title: "신청",
          onPress: () => {
            sendRequest();
          },
        },
      ],
    }
  : null;

  const clickRequestBtn = (index) => {
    // 요청 받는 사람 인덱스 recipientIndex에 담고
    setRecipientIndex(index)
    // 모달 띄우기
    setShowSendRequestModal(true)
  }

  // 모달에서 신청 버튼 눌렀을 경우, 
  const sendRequest = () => {
    // 실제로 요청 보내기

    // members에서 상태를 수락 대기 상태로 바꾸기
    const updateMembers = [...filteredMembers]
    updateMembers[recipientIndex].userStatus = '수락대기'
    setFilteredMembers(updateMembers)

    // 수신자 state변수 초기화
    setRecipientIndex(null)

    // 모달 닫기
    setShowSendRequestModal(false);
  }

  const cancelBtn = () => {
    // 수신자 state변수 초기화
    setRecipientIndex(null)

    // 모달 닫기
    setShowSendRequestModal(false);
  }

  return(
    <Wapper>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled" // 스크롤 중에도 키보드가 사라지지 않도록 설정
          > */}
              <Container>
                <TitleArea>
                  <TitleText>Team</TitleText>
                </TitleArea>
                <SearchBarArea>
                  <SearchBar searchName={searchName} setSearchName={setSearchName} />
                </SearchBarArea>
              </Container>
              <ListContainer>
                <FlatList
                  contentContainerStyle={{
                    paddingHorizontal: screenWidth * 0.07,
                    paddingBottom: screenHeight * 0.05,
                  }}
                  showsVerticalScrollIndicator={false} // 스크롤바 숨김
                  data={filteredMembers}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <UserInfoBoxView key={index}>
                      <UserInfoBox
                        proImg={item.userProfileImg}
                        level={item.level}
                        name={item.userNickName}
                        status={item.userStatus}
                        onPress={() => clickRequestBtn(index)}
                      />
                    </UserInfoBoxView>
                  )}
                />
                {/* 상단 그라데이션 레이어 */}
                <LinearGradient
                  colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 55,  // 그라데이션 영역의 높이 조절
                  }}
                />
              </ListContainer>
              {/* <ListView>
                {
                  members.map((user, index) => (
                    <UserInfoBoxView key={index}>
                      <UserInfoBox proImg={user.userProfileImg} level={user.level} name={user.userNickName} status={user.userStatus} onPress={() => clickRequestBtn(index)} />
                    </UserInfoBoxView>
                  ))
                }
              </ListView> */}
          {/* </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> */}
      {showSendRequestModal&&
        <DefaultModal isVisible={showSendRequestModal} content={sendRequestContent} />
      }
    </Wapper>
  )
}

export default CreateTeamScreen