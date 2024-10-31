import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import SquareBtn from './components/Button/SquareBtn/SquareBtn';
import RoundBtn from './components/Button/RoundBtn/RoundBtn';
import InputBox from './components/InputBox/InputBox';
import UserBtn from './components/Button/UserBtn/UserBtn';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>안녕하세요!</Text>
      <InputBox label={'라벨'} placeholder={'이름'} />
      <SquareBtn text={'테스트용'} onPress={()=>Alert.alert("함수 넘김 테스트 중입니다.")} />
      <RoundBtn text={'참가 신청하기'} onPress={()=>Alert.alert("라운드 함수 넘김 테스트 중입니다.")} />
      <UserBtn />
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
