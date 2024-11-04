import {
  Wrapper,
  Container,
  Title,
  TitleText,
  Line,
  RequestBox,
  UserImgView,
  RequestContent,
  RequestTextArea,
  BoldText,
  RequestText,
  RequestBtnArea,
  EmptyRequest,
  EmptyRequestText,
} from "./NotificationScreenStyles"
import { Image } from "react-native";
import { useState, useEffect } from "react";
import TeamRoundBtn from "../../components/Button/TeamRoundBtn/TeamRoundBtn";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import colors from "../../styles/colors";

import testImg from "./../../assets/images/testProfile1.jpg"
import testImg2 from "./../../assets/images/testProfile.jpg"

const testMyInfo = {
  marathonList: {
    '무안 마라톤' : {
      teamCode: null,
    }
  }
}
const testMyInfo2 = {
  marathonList: {
    '무안 마라톤' : {
      teamCode: '이미 참여중인 팀 명',
    }
  }
}

const testUsers = [
  {
  userNickName: '신라의 달밤',
  userProfileImg: testImg,
  marathonName: '무안 마라톤',
  teamCode: 1,
  userStatus: true, // 참여중인 팀 있음
  },
  {
  userNickName: '치즈 덕덕',
  userProfileImg: testImg2,
  marathonName: '무안 마라톤',
  teamCode: 2,
  userStatus: false, // 다른 팀에 참여중
  },
]

// const testUsers = []


const NotificationScreen = () => {
  const [myMarathonList, setMyMarathonList] = useState({})
  const [requestorList, setRequestorList] = useState([])
  const [showAcceptErrorModal, setShowAcceptErrorModal] =useState(false)

  // 참여 불가 모달
  const acceptErrorModalContent = {
    text: `해당 마라톤에\n이미 다른 팀으로\n참여 중입니다.`,
    subText: "",
    buttons: [
      {
        title: "확인",
        onPress: () => {
          setShowAcceptErrorModal(false);
        },
      },
    ],
  };
  
  useEffect(() => {
    setRequestorList([...testUsers])

    const marathonList = testMyInfo['marathonList']
    console.log('마라톤 리스트예용...', marathonList)
    setMyMarathonList({...marathonList})
  }, [])

  // [미완_백에 신청 제거 요청은 안 보냄] 거절 버튼
  const reject = (index) => {

    const newRequestorList = [...requestorList];
    newRequestorList.splice(index, 1); // 인덱스에서 요소 하나를 제거합니다.
    setRequestorList(newRequestorList);
  }

  // [미완] 수락 버튼
// [미완] 수락 버튼
const accept = (index) => {
  const marathonName = requestorList[index].marathonName;
  // 내 정보- 해당 마라톤에서 참여중인 팀이 있는지 확인
  if (marathonName in myMarathonList) {
    // teamCode가 있는지 확인
    if (myMarathonList[marathonName].teamCode) {
      console.log('이미 팀이 있어욤...');
      setShowAcceptErrorModal(true)
      reject(index); // 이미 팀이 있으면 요청 삭제
    } else {
      // 팀이 없으면 joinTeam으로 팀 등록
      joinTeam(index, marathonName, requestorList[index].teamCode);
    }
  }
};

const joinTeam = (index, marathonName, teamCode) => {
  console.log('팀이 없어서 가입 진행 중...');
  const copyMyInfo = { ...myMarathonList };
  

  // 해당 마라톤의 teamCode 업데이트
  copyMyInfo[marathonName].teamCode = teamCode;
  setMyMarathonList(copyMyInfo); // 내 마라톤 리스트 갱신
  console.log(myMarathonList)
  reject(index); // 요청 삭제
};

  return(
    <Wrapper>
      <Container>
        <Title>
          <TitleText>팀 신청</TitleText> 
        </Title>
        <Line />

        { requestorList.length > 0?
        
        requestorList.map((user, index)=>(
          (
            // 참여 요청 리스트
            <RequestBox>
              {/* 프로필 사진 */} 
              <UserImgView>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={user.userProfileImg} />
              </UserImgView>
              {/* 프로필 사진 옆 공간\ */}
              <RequestContent>
                <RequestTextArea>
                  <RequestText><BoldText>{user.userNickName}</BoldText>님이</RequestText>
                  <RequestText>{user.marathonName} 팀 참여 요청을 보냈습니다.</RequestText>
                </RequestTextArea>
                <RequestBtnArea>
                  <TeamRoundBtn text={'거절'} onPress={() => reject(index)} backColor={colors.black} />
                  <TeamRoundBtn text={'수락'} onPress={() => accept(index)} backColor={colors.o_btn} />
                </RequestBtnArea>
              </RequestContent>
            </RequestBox>
          )
        ))
        :
        <EmptyRequest>
          <EmptyRequestText>수신된 요청이 없습니다.</EmptyRequestText>
        </EmptyRequest>
      }

      </Container>
      {showAcceptErrorModal&&(
        <DefaultModal isVisible={showAcceptErrorModal} content={acceptErrorModalContent} />
      )}
    </Wrapper>
  )
}

export default NotificationScreen