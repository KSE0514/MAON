import { View, StyleSheet, TextInput, Text } from 'react-native';

const InputBox = ({label, placeholder}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 0.8,
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  input: {
    // flex: 0.7,
    aspectRatio: 5.5, // 가로가 세로의 5.5배 비율
    borderRadius: 12,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    paddingHorizontal: 18,
    backgroundColor: 'white',
    fontSize: 15,
  }
})

export default InputBox