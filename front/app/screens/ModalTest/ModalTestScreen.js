import React, { useState } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import DefaultModal from "../../components/Modal/DefaultModal/DefaultModal";
import {
  OpenModalBtn,
  OpenModalBtnText,
  Wrapper,
} from "./ModalTestScreenStyle";
import SelectModal from "../../components/Modal/SelectModal/SelectModal";
import TimerModal from "../../components/Modal/TimerModal/TimerModal";
const ModalTestScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const [runType, setRunType] = useState("");

  const startTimer = () => {
    closeModal();
  };
  const defalutModalContent = {
    // text: `상대가 요청한 상태입니다.\n알림창을 통해\n친구요청을 확인하세요.`,
    // text: "종료 하시겠습니까?",
    // text: "예빈님에게\n친추를 거시겠습니까?",
    // text: "상대가 요청한 상태입니다.\n알림 창을 통해\n친구 요청을 확인하세요.",
    text: "마라톤 신청이\n완료되었습니다.",
    // subText: "현재까지의 기록은 저장됩니다.",
    subText: "",
    buttons: [
      // {
      //   title: "취소",
      //   onPress: () => {
      //     closeModal();
      //   },
      // },
      // {
      //   title: "종료",
      //   onPress: () => {
      //     closeModal();
      //   },
      // },
      {
        title: "확인",
        onPress: () => {
          closeModal();
        },
      },
    ],
  };
  const SelectModalContent = {
    text: "참가 종목을 선택하세요.",
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
    item: [
      { label: "5km", value: "5km" },
      { label: "10km", value: "10km" },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Wrapper>
        {/* <OpenModalBtn
          title=""
          onPress={() => {
            openModal();
          }}
        >
          <OpenModalBtnText>기본 모달 열기</OpenModalBtnText>
        </OpenModalBtn> */}
        {/* <DefaultModal isVisible={isModalVisible} content={defalutModalContent} /> */}
        {/* <OpenModalBtn
          title=""
          onPress={() => {
            openModal();
          }}>
          <OpenModalBtnText>셀렉트 모달 열기</OpenModalBtnText>
        </OpenModalBtn>
        <SelectModal
          isVisible={isModalVisible}
          content={SelectModalContent}
          setRunType={setRunType}
        /> */}
        <OpenModalBtn
          title=""
          onPress={() => {
            openModal();
          }}>
          <OpenModalBtnText>달리기 시작 모달 열기</OpenModalBtnText>
        </OpenModalBtn>
        <TimerModal isVisible={isModalVisible} startTimer={startTimer} />
      </Wrapper>
    </SafeAreaView>
  );
};
export default ModalTestScreen;
