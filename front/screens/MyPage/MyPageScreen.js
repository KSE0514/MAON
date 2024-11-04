import Svg, { Path } from "react-native-svg"
// import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import {  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image, TextInput, TouchableOpacity, Text } from "react-native";
// import {PermissionsAndroid} 'react-native';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useState, useEffect } from "react"
import {
  Wapper,
  BackBtn,
  EditBtn,
  EditBtnText,
  Top,
  ProfileImg,
  TopInfoContainer,
  NickNameText,
  BodyInfoEditView,
  BodyInfoEditTextInput,
  BodyinfoText,
  Content,
  BtnArea,
} from "./MyPageScreenStyles"
import colors from "../../styles/colors"
import InputBox from "../../components/InputBox/InputBox"
import SquareBtn from "../../components/Button/SquareBtn/SquareBtn"

import testImg from './../../assets/images/testProfile.jpg'

const testUser = {
  userName: '김성은',
  userNickName: '히히',
  userPhoneNum: '01012340000',
  userEmail: 'test@email.com',
  userBirth: '20011119',
  userAddress: '광주광역시 하남 산단 5번로 12-345',
  userGender: 'female',
  userHeight: '162',
  userWeight: '1000'
}

const MyPageScreen = ({navigation}) => {
  const [editMode, setEditMode] = useState(false)

  const [dateOfBirth, setDateOfBirth] = useState(''); // 생년월일 상태 관리
  const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태 관리
  const [name, setName] = useState('') // 이름 상태관리
  const [email, setEmail] = useState('') // 이메일 상태관리
  const [address, setAddress] = useState('') // 주소 상태관리
  const [nickName, setNickName] = useState('') // 닉네임 상태관리
  const [selectedGender, setSelectedGender] = useState(null); // 선택된 성별 상태 관리

  const [heightInfo, setHeightInfo] = useState('') // 키 상태관리
  const [weightInfo, setWeightInfo] = useState('') // 몸무게 상태관리

  const [image, setImage] = useState(null);
  // const [profileImg, setProfileImg] = useState(testImg); // 초기 이미지를 테스트 이미지로 설정

  // 전화번호 형식 자동 변환
  const handlePhoneNumberChange = (text) => {
    // 숫자만 남기기
    const cleaned = text.replace(/\D/g, '');

    // 번호 형식에 맞게 변환
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }

    setPhoneNumber(formatted);
  };

// 생년월일 형식 자동 변환
const handleDateOfBirthChange = (text) => {
  const cleaned = text.replace(/\D/g, ''); // 숫자만 남기기

  let formatted = cleaned;
  if (cleaned.length > 4 && cleaned.length <= 6) {
    formatted = `${cleaned.slice(0, 4)}/${cleaned.slice(4)}`;
  } else if (cleaned.length > 6) {
    formatted = `${cleaned.slice(0, 4)}/${cleaned.slice(4, 6)}/${cleaned.slice(6, 8)}`;
  }

  setDateOfBirth(formatted);
};

  useEffect(() => {
    setEditMode(false)
    
    setName(testUser.userName)
    setNickName(testUser.userNickName)
    handlePhoneNumberChange(testUser.userPhoneNum)
    setEmail(testUser.userEmail)
    handleDateOfBirthChange(testUser.userBirth)
    setAddress(testUser.userAddress)
    setSelectedGender(testUser.userGender)
    setHeightInfo(testUser.userHeight)
    setWeightInfo(testUser.userWeight)
  }, [])

  const editComplete = () => {
    setEditMode(false)
  }

  // const selectProfileImage = async () => {
  //   // 안드로이드와 ios에 따라 적절한 권한 설정
  //   const permission =
  //     Platform.OS === 'android'?
  //     PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  //     : PERMISSIONS.IOS.PHOTO_LIBRARY;

  //   // 권한 확인
  //   const result = await check(permission);

  //   if (result === RESULTS.GRANTED) {
  //     // 권한이 허용된 경우 갤러리 열기
  //     launchImageLibrary({ mediaType: 'photo'}, (response) => {
  //       if (response.didCancel) {
  //         console.log('사용자가 이미지를 선택하지 않았습니다.');
  //       } else if (response.errorMessage) {
  //         console.error('이미지 선택 오류:', response.errorMessage);
  //       } else if (response.assets && response.assets.length > 0) {
  //         const selectedImage = response.assets[0].uri;
  //         setProfileImg(selectedImage);
  //       }
  //     });
  //   } else {
  //     // 권한 요청
  //     const requestResult = await request(permission);
  //     if (requestResult === RESULTS.GRANTED) {
  //       // 요청 후 권한이 허용된 경우 갤러리 열기
  //       launchImageLibrary({mediaType: 'photo'}, (response) => {
  //         if (response.didCancel) {
  //           console.log('사용자가 이미지를 선택하지 않았습니다.');
  //         } else if (response.errorMessage) {
  //           console.error('이미지 선택 오류:', response.errorMessage);
  //         } else if (response.assets && response.assets.length > 0) {
  //           const selectedImage = response.assets[0].uri;
  //           setProfileImg(selectedImage);
  //         }
  //       });
  //     } else {
  //       console.log('갤러리 접근 권한이 거부되었습니다.');
  //     }
  //   }
  // };

  const selectProfileImage = async () => {
    // 갤러리 접근 권한 요청
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("갤러리 접근 권한이 필요합니다.");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // 선택한 이미지 URI를 상태에 저장
    }
  };


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
                {editMode? 
                <BackBtn
                onPress={()=>setEditMode(false)}
                >
                  <Svg fill={colors.nav_orange} width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                  </Svg>
                  <EditBtnText>뒤로가기</EditBtnText>
                </BackBtn>
                :
                <EditBtn
                onPress={()=>setEditMode(true)}
                >
                  <Svg fill={colors.nav_orange} width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <Path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                  </Svg>
                  <EditBtnText>편집하기</EditBtnText>
                </EditBtn>
                }

              <Top>
                {editMode? 
                  <ProfileImg as={TouchableOpacity} onPress={selectProfileImage}>
                    <Image style={{ width: '100%', height: '100%' }} 
                    source={{ uri: image || testImg }}
                    />
                  </ProfileImg>
                :
                  <ProfileImg>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={{ uri: image || testImg }}
                    />
                  </ProfileImg>
                }
                <TopInfoContainer>
                  <NickNameText>{nickName}</NickNameText>
                  {editMode?
                  <BodyInfoEditView>
                    <BodyInfoEditTextInput 
                      value={heightInfo} 
                      placeholder="키"
                      keyboardType="numeric"
                      onChangeText={(text) => setHeightInfo(text)}
                      />
                    <Text>cm / </Text>
                    <BodyInfoEditTextInput 
                      value={weightInfo} 
                      placeholder="몸무게"
                      keyboardType="numeric"
                      onChangeText={(text) => setWeightInfo(text)}
                    />
                    <Text>kg</Text>
                  </BodyInfoEditView>
                  // <BodyinfoText>{heightInfo}cm / {weightInfo}kg</BodyinfoText>
                  :
                  <BodyinfoText>{heightInfo}cm / {weightInfo}kg</BodyinfoText>
                  }
                </TopInfoContainer>
              </Top>
              <Content>
                <InputBox label={'이름'} placeholder={'이름을 입력해주세요.'} value={name} setValue={setName} isEditMode={editMode} />
                <InputBox label={'전화번호'} placeholder={'010-XXXX-XXXX'} value={phoneNumber} setValue={setPhoneNumber} isEditMode={editMode} />
                <InputBox label={'이메일'} placeholder={'email@email.com'} value={email} setValue={setEmail} isEditMode={editMode} />
                <InputBox label={'생년월일'} placeholder={'YYYY/MM/DD'} value={dateOfBirth} setValue={setDateOfBirth} isEditMode={editMode} />
                <InputBox label={'주소'} placeholder={'주소를 입력해주세요.'} value={address} setValue={setAddress} isEditMode={editMode} />
                <InputBox label={'성별'} placeholder={''} value={selectedGender} setValue={setSelectedGender} isEditMode={editMode} />
              {editMode&&
              <BtnArea>
                <SquareBtn text={'수정하기'} onPress={editComplete} />
              </BtnArea>
              }
            </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </Wapper>
  )
}

export default MyPageScreen