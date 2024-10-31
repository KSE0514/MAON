import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import testProfile from "./../../../assets/images/testProfile.jpg"

const UserBtn = () => {
  return(
    <View style={styles.container}>
      <View style={styles.userBox}>
        <View style={styles.innerContainer}>
          <Image 
            source={testProfile} 
            style={styles.profileImg} />
          <View style={styles.profileContent}>
            <Text style={styles.level}>챌린지 Lv.5</Text>
            <Text style={styles.name}>마미남</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBox:{
    flex: 0.75,
    backgroundColor: 'white',
    aspectRatio: 3,
    borderColor: 'rgba(188, 188, 188, 0.56)',
    borderWidth: 1,
    borderRadius: 36,

    // iOS 전용 그림자 속성
    shadowColor: '#000',                  // 그림자 색상
    shadowOffset: { width: 4, height: 4 }, // 그림자 위치
    shadowOpacity: 0.14,                   // 그림자의 투명도
    shadowRadius: 5,                       // 그림자 퍼짐 정도
    // Android 전용 elevation
    // elevation: 5,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImg: {
    flex:0.35,
    aspectRatio: 1,
    borderRadius: 17,
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 3
  },
  level: {
    color: '#989898',
    fontSize: 11,
  },
  name: {
    fontSize: 16
  }
})

export default UserBtn