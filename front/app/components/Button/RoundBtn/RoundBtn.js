import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function RoundBtn({text, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.touchableOpacity}
        onPress={onPress}
        >
        <LinearGradient 
          style={styles.gradientButton}
          start={{ x: 0, y: 0.5}} // 왼쪽 중앙 시작
          end={{x: 1, y: 0.5}} // 오른쪽 중앙 종료 
          colors={['#FF740E', '#FFA646']}
        >
            <Text style={styles.btnText}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableOpacity: { 
    flex: 1, 
    flexDirection: 'row'
  },
  gradientButton: {
    flex: 0.75,
    // height: 60,
    aspectRatio: 4.5, // 가로가 세로의 4.5배 비율
    backgroundColor: '#FF740E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 78,
  },
  btnText: {    
    color: 'white',
    fontSize: 18,
  }
});