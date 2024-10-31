import React, { useState } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import {
  OpenModalBtn,
  OpenModalBtnText,
  Wrapper,
} from "./ModalTestScreenStyle";
const ModalTestScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const modalContent = {
    // text: `상대가 요청한 상태입니다.\n알림창을 통해\n친구요청을 확인하세요.`,
    text: "종료 하시겠습니까?",
    // text: "예빈님에게 친추를 거시겠습니까?",
    subText: "현재까지의 기록은 저장됩니다.",
    buttons: [
      {
        title: "취소",
        onPress: () => {
          closeModal();
        },
      },
      {
        title: "종료",
        onPress: () => {
          closeModal();
        },
      },
    ],
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Wrapper>
        <OpenModalBtn
          title=""
          onPress={() => {
            openModal();
          }}
        >
          <OpenModalBtnText>모달 열기</OpenModalBtnText>
        </OpenModalBtn>
        <DefaultModal isVisible={isModalVisible} content={modalContent} />
      </Wrapper>
    </SafeAreaView>
  );
};
export default ModalTestScreen;
