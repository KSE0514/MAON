import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import styled from "styled-components";
export const Wrapper = styled.View`
  flex: 1;
  padding: 0px 30px;
`;

export const Col = styled.View``;
export const AddRouteBtn = styled.TouchableOpacity``;

export const ViewTypeChangeBtn = styled.TouchableOpacity``;
export const FinishBtn = styled.TouchableOpacity``;

export const styles = StyleSheet.create({
  boldFont: {
    fontFamily: fonts.gMarketBold,
    fontSize: 16,
  },
  routeAddView: {
    paddingVertical: 20,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
