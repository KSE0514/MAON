import styled from "styled-components";
import { SafeAreaView, View, Text, Image } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import React from "react";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


export const Wapper = styled.SafeAreaView`
  flex:1;
  background-color: ${colors.white};
`

export const Container = styled.View`
  padding-top: ${screenHeight*0.05}px;
  padding-horizontal: ${screenWidth*0.07}px;
  padding-bottom: ${screenHeight*0.05}px;
`

export const TitleArea = styled.View`
  padding-vertical: 22px;
`

export const TitleText = styled.Text`
  font-family: ${fonts.gMarketMedium};
  font-size: 30px;
`
export const ListView = styled.View`
  padding-top: 5px;
`

export const UserInfoBoxView = styled.View`
  padding-top: 25px;
`
