import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useFontsLoaded } from "../../utils/fontContext";
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { useState } from 'react';

const InputBox = ({label, placeholder}) => {
  const fontsLoaded = useFontsLoaded();
  const [selectedGender, setSelectedGender] = useState(null); // 선택된 성별 상태 관리
  const [dateOfBirth, setDateOfBirth] = useState(''); // 생년월일 상태 관리
  const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태 관리

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  // 성별
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };


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

        // 그외 input(1.숫자 키보드이용 / 2. 숫자 키보드X)
        // 1. 생년월일 or 전화번호일 경우(숫자 패드)
        label === "생년월일" ?
        (
          <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={dateOfBirth}
              onChangeText={handleDateOfBirthChange}
              keyboardType="numeric"
            />
        )
        :
        label === '전화번호' ?
        (
          <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
              keyboardType="numeric"
            />
        )
        :
        label === ''?
          (
            <TextInput
              style={[styles.input, {textAlign: 'center'}]}
              placeholder={placeholder}
            />
          )
          :
          (
            // 2. 생일과 전화번호를 제외한 모든 input
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              inputMode={label==="이메일"? 'email' : 'text'}
            />
          )

        }
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
