import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useFontsLoaded } from "../../utils/fontContext";
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { useState } from 'react';

const InputBox = ({label, placeholder}) => {
  const fontsLoaded = useFontsLoaded();
  const [selectedGender, setSelectedGender] = useState(null); // 선택된 성별 상태 관리
  const [date, setDate] = useState('');

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  // 성별
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  // // 생년월일
  // const handleDateChange = (text) => {
  //   // 정규식을 사용하여 YYYY-MM-DD 형식인지 확인
  //   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  //   if (dateRegex.test(text)) {
  //     setDate(text);
  //   } else {
  //     // 유효하지 않은 경우 처리
  //     setDate('');
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {label && <Text style={styles.label}>{label}</Text>}

        {/* 성별 버튼 */}
        {label === '성별' ? (
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === '남' && { backgroundColor: colors.light_begie }
              ]}
              onPress={() => handleGenderSelect('남')}
            >
              <Text style={styles.genderText}>남</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === '여' && { backgroundColor: colors.light_begie }
              ]}
              onPress={() => handleGenderSelect('여')}
            >
              <Text style={styles.genderText}>여</Text>
            </TouchableOpacity>
          </View>
        ) :

        // 그외 input

        // 1. 생년월일일 경우
        label === "생년월일" ?
        (
          <TextInput
              style={styles.input}
              placeholder={placeholder}
              // value={date}
              // onChangeText={handleDateChange}
              keyboardType="numeric"
            />
        )
        :
        // 2. 생일을 제외한 모든 input
        (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            inputMode={label==="이메일"? 'email' : 'text'}
            // inputMode='email'
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: fonts.gMarketLight,
  },
  input: {
    height: 50, // 높이를 직접 설정하여 일관되게 만듦
    borderRadius: 12,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    paddingHorizontal: 18,
    backgroundColor: 'white',
    fontSize: 15,
    fontFamily: fonts.gMarketLight,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    gap: 10,    
  },
  genderButton: {
    flex: 1,
    height: 50, // input과 동일한 높이 설정
    borderRadius: 12,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderText: {
    fontSize: 15,
    fontFamily: fonts.gMarketLight,
  },
});

export default InputBox;
