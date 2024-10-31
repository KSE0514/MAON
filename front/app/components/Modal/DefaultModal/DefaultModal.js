import React from "react";
import {
  ModalContainer,
  ModalContent,
  ModalText,
  ModalButton,
  ButtonText,
  ButtonView,
} from "./DefaultModalStyles";

const DefaultModal = ({ isVisible, onClose, content, styleProps, mode }) => {
  if (!isVisible) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalText>{content.text}</ModalText>
        <ButtonView>
          {content.buttons.map((button, index) => (
            <ModalButton
              title=""
              key={index}
              index={index}
              onPress={button.onPress}
            >
              <ButtonText index={index}>{button.title}</ButtonText>
            </ModalButton>
          ))}
        </ButtonView>
      </ModalContent>
    </ModalContainer>
  );
};

export default DefaultModal;
