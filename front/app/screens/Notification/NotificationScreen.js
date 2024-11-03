import {
  Wapper,
} from "./NotificationScreenStyles"
import { Text } from "react-native";
import TeamRoundBtn from "../../components/Button/TeamRoundBtn/TeamRoundBtn";
import colors from "../../styles/colors";


const NotificationScreen = () => {
  return(
    <Wapper>
      <Text>팀신청</Text>
      <TeamRoundBtn text={'수락'} onPress={() => console.log("수락 버튼 클릭")} backColor={colors.o_btn} />
    </Wapper>
  )
}

export default NotificationScreen