import {
  Wapper,
  Container,
  TitleArea,
  TitleText,
  ListView,
  UserInfoBoxView,
  BackBtn,
  FollowerBtn,
  FollowerBtnText,
} from "./CreateTeamScreenStyles"
import HeaderNavigation from "../../components/HeaderNavigation/HeaderNavigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserInfoBox from "../../components/Button/UserInfoBox/UserInfoBox";
import { useState, useEffect } from "react";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import {  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image, TextInput, TouchableOpacity, Text } from "react-native";
import testImg from './../../assets/images/testProfile2.jpg'
import testImg1 from "./../../assets/images/testProfile1.jpg"
import testImg2 from "./../../assets/images/testProfile.jpg"

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
  const [recipientIndex, setRecipientIndex] = useState(null)  // 초기값을 null로 설정
  const [showSendRequestModal, setShowSendRequestModal] =useState(false)
  const [members, setMembers] = useState([])

  useEffect(() => {
    setMembers(testUsers)
  }, [])

  // 팀 참여 요청
  const sendRequestContent = recipientIndex !== null && recipientIndex >= 0 && recipientIndex < members.length
  ? {
      text: `'${members[recipientIndex].userNickName}'님에게\n요청을 보내겠습니까?`,
      subText: "",
      buttons: [
        {
          title: "취소",
          onPress: () => {
            setShowSendRequestModal(false);
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
    const updateMembers = [...members]
    updateMembers[recipientIndex].userStatus = '수락대기'
    setMembers(updateMembers)

    // 수신자 state변수 초기화
    setRecipientIndex(null)

    // 모달 닫기
    setShowSendRequestModal(false);
  }

  return(
    <Wapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled" // 스크롤 중에도 키보드가 사라지지 않도록 설정
          >
            <Container>
              <TitleArea>
                <TitleText>Team</TitleText>
              </TitleArea>
              <SearchBar />
              <ListView>
                {
                  members.map((user, index) => (
                    <UserInfoBoxView key={index}>
                      <UserInfoBox proImg={user.userProfileImg} level={user.level} name={user.userNickName} status={user.userStatus} onPress={() => clickRequestBtn(index)} />
                    </UserInfoBoxView>
                  ))
                }
              </ListView>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {showSendRequestModal&&
        <DefaultModal isVisible={showSendRequestModal} content={sendRequestContent} />
      }
    </Wapper>
  )
}

export default CreateTeamScreen