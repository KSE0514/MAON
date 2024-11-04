import {
  Wapper,
  BackBtn,
  FollowerBtn,
  FollowerBtnText,
} from "./CreateTeamScreenStyles"
import HeaderNavigation from "../../components/HeaderNavigation/HeaderNavigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserInfoBox from "../../components/Button/UserInfoBox/UserInfoBox";
import { useState, useEffect } from "react";

import { Text, TouchableOpacity } from "react-native"



const CreateTeamScreen = ({navigation}) => {
  return(
    <Wapper>
      {/* <HeaderNavigation /> */}
      <Text>Team</Text>
      <SearchBar />
      <UserInfoBox />
    </Wapper>
  )
}

export default CreateTeamScreen