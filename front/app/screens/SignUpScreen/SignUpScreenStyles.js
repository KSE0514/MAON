import styled from "styled-components";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  `

export const Content = styled.ScrollView`
  padding-horizontal: 10%;
  padding-vertical: 5%;
`

export const Title = styled.View`
  padding-vertical: 5%;
`

export const TitleContent = styled.Text`
  font-size: 20px;
  padding-vertical: 3px;
  font-family: ${fonts.gMarketLight};
`

export const Main = styled.View`
  gap: 30%;
`

export const UserInfo = styled.View`
  gap: 10%;
`

export const UserBodyInfo = styled.View`
  width: 50%;
  ${({ isRightAligned }) => (isRightAligned ? 'margin-left: auto;' : 'margin-right: auto;')}
`

export const BoldText = styled.Text`
  font-size: 20px;
  color: ${colors.light_orange};
  font-family: ${fonts.gMarketMedium};
`
export const BtnArea = styled.View`
    padding-vertical: 7%;
`