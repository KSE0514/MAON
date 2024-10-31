import React, { useState } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import { Wrapper } from "./ModalTestScreenStyle";
const ModalTestScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const modalContent = {
    text: "종료 하시겠습니까?",
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
        <Button
          title=""
          onPress={() => {
            openModal();
          }}
        />
        <DefaultModal isVisible={isModalVisible} content={modalContent} />
      </Wrapper>
    </SafeAreaView>
  );
};
export default ModalTestScreen;
