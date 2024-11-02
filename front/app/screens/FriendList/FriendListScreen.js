import {Wapper} from "./FriendListScreenStyles"
import HeaderNavigation from "../../components/HeaderNavigation/HeaderNavigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserInfoBox from "../../components/Button/UserInfoBox/UserInfoBox";

import { Text, TouchableOpacity } from "react-native"

const FriendListScreen = ({navigation}) => {
  return(
    <Wapper>
      <HeaderNavigation />
      <SearchBar />
      <UserInfoBox />
      <Text>친구 목록</Text>
    </Wapper>
  )
}

export default FriendListScreen