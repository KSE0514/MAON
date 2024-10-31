import styled from "styled-components/native";
import colors from "../../../styles/colors";
import { Text, TouchableOpacity } from "react-native";

export const ModalContainer = styled.View`
  flex: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: ${colors.modal_background};
  position: absolute;
`;
export const ModalContent = styled.View`
  background-color: ${colors.white};
  width: 50%;
`;
export const ModalText = styled(Text)`
  color: ${colors.black};
  font-size: 20px;
`;
export const ButtonView = styled.View`
  flex-direction: row;
`;
export const ModalButton = styled.TouchableOpacity`
  width: 40%;
  background-color: ${({ index }) =>
    index === 0 ? `${colors.light_begie}` : `${colors.dark_mandarind}`};
`;
export const ButtonText = styled(Text)`
  color: ${({ index }) =>
    index === 0 ? `${colors.black}` : `${colors.white}`};
  font-size: 16px;
  padding: 15px 20px;
`;
