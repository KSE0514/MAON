import styled from "styled-components";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`

export const MapArea = styled.View`
  height: ${screenHeight*0.35}px;
  overflow: hidden;
`

export  const BookmarkBtnArea = styled.View`
  position: absolute;
  width: ${screenWidth*0.37}px;
  right: ${screenWidth*0.03}px;
  top: ${screenHeight*0.02}px;
`

export const ContentArea = styled.View`
`

export const TitleArea = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${screenHeight*0.09}px;
  padding-horizontal: ${screenWidth*0.05}px;
`

export const TitleText = styled.Text`
  font-size: 25%;
  font-family: ${fonts.gMarketMedium};
`

export const DetailInfoArea = styled.View`
  padding-horizontal: ${screenWidth*0.09}px;
`

export const DetailInfoView = styled.View`
  gap: 15px;
`

export const LineInfoView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
export const LineInfoText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.gMarketLight};
`

export const BtnArea = styled.View`
  padding-top: ${screenHeight*0.05}px;
  align-items: center;
  justify-content: center;


`

export const HalfBtnContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`

export const BtnHalfArea = styled.View`
  width:  ${screenWidth*0.39}px;
`
export const TeamContainer = styled.View`
`

export const TeamTitleArea = styled.View`
  height: ${screenHeight*0.11}px;
  justify-content: flex-end;
  padding-bottom: 20px;

`

export const TeamTitleText= styled.Text`
  font-family: ${fonts.gMarketMedium};
  font-size: 30px;
`

export const AddUserView = styled.TouchableOpacity`
  position: absolute;
  padding-bottom: 20px;
  right: 0;
`

export const AddUserText = styled.Text`
  font-family: ${fonts.gMarketMedium};
  font-size: 17px;
`

export const TeamListArea = styled.View`
  gap: 20px;
`