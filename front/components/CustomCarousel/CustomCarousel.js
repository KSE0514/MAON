import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Col, Row, RunBtn, Wrapper, styles } from "./CustomCarouselStyle";
import color from "../../styles/colors";
import {
  faLocationDot,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/pro-duotone-svg-icons";
import fonts from "../../styles/fonts";

const { width } = Dimensions.get("window");

const data = [
  {
    name: "2024 국제 국민 마라톤",
    eventDate: "2024.12.03",
    routeLength: "5km",
    place: "여의도 공원 문화의 마당",
  },
  {
    name: "무안 마라톤",
    eventDate: "2024.12.12",
    routeLength: "10km",
    place: "무안 어딘가에서",
  },
  {
    name: "인천 무슨 무슨 마라톤",
    eventDate: "2024.12.27",
    routeLength: "10km",
    place: "인천 무슨무슨구 무슨무슨 곳에서",
  },
];

const CustomCarousel = () => {
  return (
    <Carousel
      width={width}
      data={data}
      renderItem={({ item }) => (
        <Wrapper style={styles.wrapper}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={{ flexDirection: "row", marginTop: 5, flex: 1 }}>
            <Col>
              <Row>
                <FontAwesomeIcon
                  size={20}
                  icon={faCalendarDays}
                  color={color.grape_fruit}
                  secondaryColor={color.light_mandarin}
                  swapOpacity={true} // 필요에 따라 두 색상 간의 불투명도 조정
                />
                <Text style={styles.subText}>{item.eventDate}</Text>
              </Row>
              <Row>
                <FontAwesomeIcon
                  icon={faPersonRunning}
                  size={20}
                  color={color.grape_fruit}
                />
                <Text style={[styles.subText]}>{item.routeLength}</Text>
              </Row>
              <Row>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size={20}
                  color={color.grape_fruit}
                />
                <Text
                  style={[styles.subText, { width: 130 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.place}
                </Text>
              </Row>
              <Row
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                <RunBtn>
                  <Text
                    style={{ color: "white", fontFamily: fonts.gMarketBold }}
                  >
                    D-2
                  </Text>
                </RunBtn>
              </Row>
            </Col>
            <Col style={{ marginRight: 20, marginLeft: 20 }}>
              <Image
                style={{ flex: 1 }}
                source={require("../../assets/images/route.png")}
              />
            </Col>
          </View>
        </Wrapper>
      )}
      style={{ flex: 1 }}
    />
  );
};

export default CustomCarousel;
