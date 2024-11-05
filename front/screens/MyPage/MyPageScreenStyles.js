import styled, { withTheme } from "styled-components";
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import React from "react";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const Wapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`
export const BackBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
`

export const EditBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
`
export const EditBtnText = styled.Text`
  font-size: 15px;
  font-family: ${fonts.gMarketMedium};
  color: ${colors.nav_orange};
`

export const Top = styled.View`
  align-items: center;
  padding-vertical: 20px;
`

export const ProfileImg = styled.View`
  width: 40%;
  aspect-ratio: 1;
  border: 3px solid ${colors.grape_fruit};
  border-radius: 35px;
  overflow: hidden;
`
export const TopInfoContainer = styled.View`
  align-items: center;
  margin-top: 30px;
`

export const NickNameText = styled.Text`
  font-family: ${fonts.gMarketBold};
  color: ${colors.black};
  font-size: 34%;
`

export const BodyInfoEditView = styled.View`
  margin-top: 5px;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`

export const BodyInfoEditTextInput = styled.TextInput`
  border: 1px solid rgba(188, 188, 188, 0.56);
  aspect-ratio: 3;
  borderRadius: 10px;
  font-family: ${fonts.gMarketMedium};
  font-size: 14%;
  text-align: center;
  width: 100px;
  padding-horizontal: 10px;
`

export const BodyinfoText = styled.Text`
  font-family: ${fonts.gMarketMedium};
  color: ${colors.black};
  font-size: 14%;
  margin-top: 5px;
  line-height: 22px;
  padding-vertical: 2px;
`

export const Content = styled.View`
  padding-horizontal: 10%;
  padding-vertical: 5%;
  gap: 10%;
`

export const BtnArea = styled.View`
  margin-top: 10%;
`