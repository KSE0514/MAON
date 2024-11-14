import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { useEffect, useState } from "react";
import { apiClient } from "../../customAxios";
import { Button, ButtonView, Title, styles } from "./PairingWatchStyle";

import useAuthStore from "../../store/AuthStore";

const PairingWatch = ({ navigation, route }) => {
  const { user } = useAuthStore();

  const [step, setStep] = useState(1);
  const [pairedWatch, setPairedWatch] = useState(false);

  const fontsLoaded = useFontsLoaded();
  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }

  useEffect(() => {
    //페어링된 워치가 있는지 판단
  });

  const goHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {step === 1 &&
          (pairedWatch ? (
            <View>
              <Title
                style={[styles.BoldFont]}
              >{`연동된 워치가 존재합니다.\n새로운 워치를 연동하시겠습니까?`}</Title>
              <ButtonView>
                <Button
                  onPress={() => {
                    goHome();
                  }}
                >
                  <Text style={[styles.buttonText]}>취소</Text>
                </Button>
                <Button
                  onPress={() => {
                    setStep(2);
                  }}
                >
                  <Text style={[styles.buttonText]}>확인</Text>
                </Button>
              </ButtonView>
            </View>
          ) : (
            <View>
              <Title style={[styles.BoldFont]}>워치를 연동하시겠습니까?</Title>
              <ButtonView>
                <Button
                  onPress={() => {
                    goHome();
                  }}
                >
                  <Text style={[styles.buttonText]}>취소</Text>
                </Button>
                <Button>
                  <Text
                    style={[styles.buttonText]}
                    onPress={() => {
                      setStep(2);
                    }}
                  >
                    확인
                  </Text>
                </Button>
              </ButtonView>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
};
export default PairingWatch;
