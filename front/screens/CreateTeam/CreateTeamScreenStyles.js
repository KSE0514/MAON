import styled from "styled-components";
import { SafeAreaView, View, Text, Image } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import React from "react";

export const Wapper = styled.SafeAreaView`
  flex:1;
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
export const FollowerBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
`
export const FollowerBtnText = styled.Text`
  font-size: 15px;
  font-family: ${fonts.gMarketMedium};
  color: ${colors.nav_orange};
`