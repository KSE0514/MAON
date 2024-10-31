import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import SquareBtn from './components/Button/SquareBtn/SquareBtn';
import RoundBtn from './components/Button/RoundBtn/RoundBtn';
import InputBox from './components/InputBox/InputBox';
import UserBtn from './components/Button/UserBtn/UserBtn';
import SearchBar from './components/SearchBar/SearchBar';
import HeaderNavigation from './components/HeaderNavigation/HeaderNavigation';
import FooterNavigation from './components/FooterNavigation/FooterNavigation';
import UserStatusBtn from './components/Button/UserStatusBtn/UserStatusBtn';

// import testProfile from "./assets/images/testProfile.jpg"
// import testProfile from "./assets/images/testProfile1.jpg"
import testProfile from "./assets/images/testProfile2.jpg"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>안녕하세요!</Text>
      <HeaderNavigation />
      <InputBox label={'라벨'} placeholder={'이름'} />
      <SquareBtn text={'테스트용'} onPress={()=>Alert.alert("함수 넘김 테스트 중입니다.")} />
      <SearchBar />
      {/* <UserStatusBtn text={"요청하기"}></UserStatusBtn> */}
      <RoundBtn text={'참가 신청하기'} onPress={()=>Alert.alert("라운드 함수 넘김 테스트 중입니다.")} />
      <UserBtn proImg={testProfile} level={5} name={'마미남'} status={'show-detail'}/>
      {/* <UserBtn proImg={testProfile} level={5} name={'마미남'} status={'수락대기'}/>
      <UserBtn proImg={testProfile} level={5} name={'마미남'} status={'요청하기'}/>
      <UserBtn proImg={testProfile} level={5} name={'마미남'} status={'친구신청'}/> */}
      <FooterNavigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
