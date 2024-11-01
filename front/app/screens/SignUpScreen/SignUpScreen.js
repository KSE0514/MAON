import React from "react";
import { useState } from "react";
import { useFontsLoaded } from "../../utils/fontContext";
import { 
  Wrapper,
  Content,
  Title,
  TitleContent,
  BoldText,
  Main,
  UserInfo,
  UserBodyInfo,
  BtnArea,
} from "./SignUpScreenStyles"

import BodyInfo from "../../components/BodyInfo/BodyInfo";
import CustomIcon from "../../components/CustomIcon/CustomIcon";
import InputBox from "./../../components/InputBox/InputBox"
import SquareBtn from "./../../components/Button/SquareBtn/SquareBtn"

const SignUpScreen = ({navigation}) => {
  const fontsLoaded = useFontsLoaded();
  const [process, setProcess] = useState(0);

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return(
    <Wrapper>
      {process === 0? 
        <Content
        showsVerticalScrollIndicator={false} // 스크롤바 숨기기
        >
          <Title>
            <TitleContent>MO:ON 이용을 위한</TitleContent>
            <TitleContent><BoldText>회원가입</BoldText>을 진행해주세요.</TitleContent>
          </Title>
          <UserInfo>
            <InputBox label={'이름'} placeholder={'이름을 입력해주세요.'} />
            <InputBox label={'전화번호'} placeholder={'010-XXXX-XXXX'} />
            <InputBox label={'이메일'} placeholder={'email@email.com'} />
            <InputBox label={'생년월일'} placeholder={'YYYY/MM/DD'} />
            <InputBox label={'성별'} placeholder={'YYYY/MM/DD'} />
          </UserInfo>
          <BtnArea>
            <SquareBtn text={'입력 완료'} onPress={()=>setProcess(1)} />
          </BtnArea>
        </Content>
      :null}
      {process === 1? 
        <Content>
          <Title>
            <TitleContent>MO:ON 이용을 위한</TitleContent>
            <TitleContent><BoldText>신체정보</BoldText>를 입력해주세요.</TitleContent>
          </Title>
          <Main>
            <UserBodyInfo isRightAligned={true}>
              <BodyInfo label={'키'} placeholder={'키'}/>
            </UserBodyInfo>
            <CustomIcon />
            <UserBodyInfo isRightAligned={false}>
              <BodyInfo label={'몸무게'} placeholder={'몸무게'}/>
            </UserBodyInfo>
          </Main>
          <BtnArea>
            <SquareBtn text={'가입하기'} onPress={()=>console.log('가입 버튼 누름')} />
          </BtnArea>
        </Content>
      :null}
    </Wrapper>
  )
}

export default SignUpScreen;