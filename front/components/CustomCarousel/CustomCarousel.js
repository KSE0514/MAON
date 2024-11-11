import React, { useEffect, useState } from "react";
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
import { apiClient } from "../../customAxios";

const { width } = Dimensions.get("window");

const data = [
  {
    title: "2024 국제 국민 마라톤",
    tournamentDayStart: "2024-11-11T14:30:45",
    tournamentCategory: "5km",
    locatoin: "여의도 공원 문화의 마당",
  },
  {
    title: "무안 마라톤",
    tournamentDayStart: "2024-11-13T14:30:45",
    tournamentCategory: "10km",
    locatoin: "무안 어딘가에서",
  },
  {
    title: "인천 무슨 무슨 마라톤",
    tournamentDayStart: "2024-11-15T14:30:45",
    tournamentCategory: "10km",
    locatoin: "인천 무슨무슨구 무슨무슨 곳에서",
  },
];

const CustomCarousel = () => {
  const [myMarathonList, setMyMarathoneList] = useState();
  useEffect(() => {
    const getMyMarathonList = async () => {
      console.log("getMyMarathonList");
      try {
        const response = await apiClient.get(`/tournament/participant/my`);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMyMarathonList();
  });
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }
  function calculateDaysLeft(targetDate) {
    // 현재 날짜와 시간을 로컬 시간으로 강제 설정
    const today = new Date();
    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    );

    // targetDate를 "YYYY-MM-DDTHH:MM:SS" 형식으로 파싱하여 로컬 시간으로 변환
    const [datePart, timePart] = targetDate.split("T");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes, seconds] = timePart.split(":");

    // 로컬 시간대에서의 목표 날짜 및 시간을 생성
    const target = new Date(
      parseInt(year), // 연도
      parseInt(month) - 1, // 월 (0부터 시작)
      parseInt(day), // 일
      parseInt(hours), // 시
      parseInt(minutes), // 분
      parseInt(seconds) // 초
    );
    console.log(localToday);
    console.log(target);

    // 두 날짜 간의 차이를 계산 (밀리초 단위)
    const difference = target - localToday;
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

    // 남은 일수 또는 "D-Day" 반환
    return daysLeft > 0 ? `D-${daysLeft}` : "D-Day";
  }

  return (
    <Carousel
      width={width}
      data={data}
      renderItem={({ item }) => (
        <Wrapper style={styles.wrapper}>
          <Text style={styles.title}>{item.title}</Text>
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
                <Text style={styles.subText}>
                  {formatDate(item.tournamentDayStart)}
                </Text>
              </Row>
              <Row>
                <FontAwesomeIcon
                  icon={faPersonRunning}
                  size={20}
                  color={color.grape_fruit}
                />
                <Text style={[styles.subText]}>{item.tournamentCategory}</Text>
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
                  {item.locatoin}
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
                    {calculateDaysLeft(item.tournamentDayStart)}
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
