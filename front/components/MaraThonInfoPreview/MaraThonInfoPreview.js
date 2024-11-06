import { SafeAreaView, View, Text, Button, Image } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import {
  Col,
  Row,
  Wrapper,
  styles,
} from "../RouteInfoPreview/RouteInfoPreviewStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/pro-duotone-svg-icons";
import color from "../../styles/colors";
import fonts from "../../styles/fonts";
import { status } from "./MaraThonInfoPreviewStyle";
const MaraThonInfoPreview = ({ navigation, data, mode }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper>
      <Col>
        <View>
          <Image source={require("../../assets/images/route.png")} />
          <View style={status.status}>
            {true ? (
              <Text style={status.ing}>접수중</Text>
            ) : (
              <Text style={status.end}>접수종료</Text>
            )}
          </View>
        </View>
      </Col>
      <Col style={styles.secondCol}>
        <Row style={{ marginTop: 5 }}>
          <FontAwesomeIcon icon={faLocationDot} color={color.red} />
          <Text style={[styles.SmallText]}>{data.address}</Text>
        </Row>
        <Row>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.LargeText]}
          >
            {data.name}
          </Text>
        </Row>
        <Row>
          <Text style={[styles.LargeText]}>{data.price}</Text>
        </Row>
        <Row>
          <FontAwesomeIcon
            icon={faCalendarDays}
            color={color.grape_fruit}
            secondaryColor={color.light_mandarin}
            swapOpacity={true} // 필요에 따라 두 색상 간의 불투명도 조정
          />

          <Text style={[styles.SmallText]}>{data.eventDate}</Text>
        </Row>
        <Row>
          {data.routeLength.map((length, index) => {
            console.log("Current length:", length); // length 값을 확인하기 위한 로그
            return (
              <View
                key={index}
                style={[
                  {
                    width: 22,
                    height: 22,
                    marginRight: 10,
                    borderRadius: 11,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      length == "Full"
                        ? color.grape_fruit
                        : length == "Half"
                        ? color.dark_mandarind
                        : length == "10km"
                        ? color.mandarin
                        : color.light_mandarin,
                  },
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: fonts.gMarketBold,
                  }}
                >
                  {length.startsWith("10") ? "10" : length.charAt(0)}
                </Text>
              </View>
            );
          })}
        </Row>
      </Col>
    </Wrapper>
  );
};
export default MaraThonInfoPreview;
