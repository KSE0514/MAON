import { SafeAreaView, View, Text, Button, Image } from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { Col, Row, Wrapper, styles } from "./RouteInfoPreviewStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays } from "@fortawesome/pro-duotone-svg-icons";
import color from "../../styles/colors";
const RouteInfoPreview = ({ navigation, data, mode, moveDetail }) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // 폰트 로드 전까지 렌더링 방지
  }
  return (
    <Wrapper onPress={moveDetail}>
      <Col>
        <View>
          <Image source={require("../../assets/images/route.png")} />
        </View>
      </Col>
      <Col style={styles.secondCol}>
        <Row
          style={{
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesomeIcon icon={faLocationDot} color={color.red} />
            <Text style={[styles.SmallText]}>{data.startPoint}</Text>
          </View>

          {true ? (
            <FontAwesomeIcon size={16} icon={faBookmarkSolid} />
          ) : (
            <FontAwesomeIcon size={16} icon={faBookmarkRegular} />
          )}
        </Row>
        <Row>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.LargeText]}
          >
            {data.routeName}
          </Text>
        </Row>
        <Row>
          <Text style={[styles.LargeText]}>{data.distance}Km</Text>
        </Row>
        <Row>
          <FontAwesomeIcon
            icon={faCalendarDays}
            color={color.grape_fruit}
            secondaryColor={color.light_mandarin}
            swapOpacity={true} // 필요에 따라 두 색상 간의 불투명도 조정
          />

          <Text style={[styles.SmallText]}>
            등록일:
            {new Date(data.createdAt)
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\s/g, "")
              .replace(/\.$/, "")}
          </Text>
        </Row>
        <Row>
          <FontAwesomeIcon color={color.grape_fruit} icon={faPenToSquare} />
          <Text style={[styles.SmallText]}>작성자: {data.memberName}</Text>
        </Row>
      </Col>
    </Wrapper>
  );
};
export default RouteInfoPreview;
