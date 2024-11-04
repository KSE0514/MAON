import React from "react";
import {KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { useState } from "react";
import { useFontsLoaded } from "../../utils/fontContext";
import { 
  Wrapper,
  Content,
  Title,
  TitleContent,
  BoldText,
  Main,
  ProfileChangeIcon,
  PlusIcon,
  UserInfo,
  UserBodyInfo,
  BtnArea,
} from "./SignUpScreenStyles"
import Svg, { Path } from "react-native-svg";
import colors from "../../styles/colors";

import BodyInfo from "../../components/BodyInfo/BodyInfo";
import CustomIcon from "../../components/CustomIcon/CustomIcon";
import InputBox from "./../../components/InputBox/InputBox"
import SquareBtn from "./../../components/Button/SquareBtn/SquareBtn"

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignUpScreen = ({navigation}) => {
  const fontsLoaded = useFontsLoaded();
  const [process, setProcess] = useState(0);

  const [dateOfBirth, setDateOfBirth] = useState(''); // 생년월일 상태 관리
  const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태 관리
  const [name, setName] = useState('') // 이름 상태관리
  const [email, setEmail] = useState('') // 이메일 상태관리
  const [nickName, setNickName] = useState('') // 닉네임 상태관리
  const [selectedGender, setSelectedGender] = useState(null); // 선택된 성별 상태 관리

  const [heightInfo, setHeightInfo] = useState('') // 키 상태관리
  const [weightInfo, setWeightInfo] = useState('') // 몸무게 상태관리


  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  // 회원가입 완료시 동작
  const SignUpComplete = () =>  {
    console.log("가입 완료")
    navigation.navigate('Home')
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled" // 스크롤 중에도 키보드가 사라지지 않도록 설정
        >
        <Wrapper>
          {process === 0? 
            <Content
            showsVerticalScrollIndicator={false} // 스크롤바 숨기기
            >
              <Title>
                <TitleContent>MA:ON 이용을 위한</TitleContent>
                <TitleContent><BoldText>회원가입</BoldText>을 진행해주세요.</TitleContent>
              </Title>
              <UserInfo>
                <InputBox label={'이름'} placeholder={'이름을 입력해주세요.'} value={name} setValue={setName} isEditMode={true}/>
                <InputBox label={'전화번호'} placeholder={'010-XXXX-XXXX'} value={phoneNumber} setValue={setPhoneNumber} isEditMode={true}/>
                <InputBox label={'이메일'} placeholder={'email@email.com'} value={email} setValue={setEmail} isEditMode={true} />
                <InputBox label={'생년월일'} placeholder={'YYYY/MM/DD'} value={dateOfBirth} setValue={setDateOfBirth} isEditMode={true} />
                <InputBox label={'성별'} placeholder={''} value={selectedGender} setValue={setSelectedGender} isEditMode={true} />
              </UserInfo>
              <BtnArea>
                <SquareBtn text={'입력 완료'} onPress={()=>setProcess(1)} />
              </BtnArea>
            </Content>
          :null}
          {process === 1? 
            <Content>
              <Title>
                <TitleContent>MA:ON 이용을 위한</TitleContent>
                <TitleContent><BoldText>신체정보</BoldText>를 입력해주세요.</TitleContent>
              </Title>
              <Main>
                <UserBodyInfo isRightAligned={true}>
                  <BodyInfo label={'키'} placeholder={'키'} value={heightInfo} setValue={setHeightInfo} />
                </UserBodyInfo>
                <CustomIcon />
                <UserBodyInfo isRightAligned={false}>
                  <BodyInfo label={'몸무게'} placeholder={'몸무게'} value={weightInfo} setValue={setWeightInfo} />
                </UserBodyInfo>
              </Main>
              <BtnArea>
                <SquareBtn text={'가입하기'} onPress={()=>setProcess(2)} />
              </BtnArea>
            </Content>
          :null}
          {process === 2?
            <Content>
              <Title>
                <TitleContent>MA:ON 이용 시</TitleContent>
                <TitleContent>사용할 <BoldText>프로필</BoldText>을 설정해주세요.</TitleContent>
              </Title>
              <ProfileChangeIcon>
                <PlusIcon>
                  <Svg fill={colors.black} width={screenWidth*0.12} height={screenWidth*0.12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <Path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 160L40 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l160 0 0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160 160 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-160 0 0-160z"/>
                  </Svg>
                </PlusIcon>
                <Svg width={screenWidth*0.35} height={screenWidth*0.35} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <Path fill={colors.dark_mandarind} className="fa-secondary" opacity=".4" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128z"/>
                  <Path fill={colors.black} className="fa-primary" d="M0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                </Svg>
              </ProfileChangeIcon>
              <BtnArea>
                <InputBox label={''} placeholder={'닉네임은 이후 변경이 불가합니다.'} value={nickName} setValue={setNickName} isEditMode={true} />
              </BtnArea>
              <BtnArea>
                <SquareBtn text={'등록하기'} onPress={SignUpComplete} />
              </BtnArea>
            </Content>
          :
            null
          }
        </Wrapper>
      </ScrollView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  )
}

export default SignUpScreen;