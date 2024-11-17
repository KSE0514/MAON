import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import PieChart from "react-native-pie-chart";
import fonts from "../../styles/fonts";
import color from "../../styles/colors";

const GoalDonutChart = ({ goalDistance, currentDistance, mode }) => {
  // console.log("GoalDonut distance:", currentDistance);
  const chartSize = 110;
  const progress =
    goalDistance == 0 ? 100 : (currentDistance / goalDistance) * 100; // 목표 대비 현재 진행률 계산
  const series = [progress, 100 - progress]; // 채운 비율과 남은 비율
  const sliceColor = [color.light_orange, "#D9D9D9"]; // 채워진 부분과 남은 부분 색상

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <PieChart
        widthAndHeight={chartSize}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.9} // 도넛 형태 설정
        coverFill={"#FFF"}
      />
      <View style={{ position: "absolute", alignItems: "center" }}>
        {mode == "notSelectedRoute" && (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {(Math.floor(currentDistance * 10) / 10).toFixed(1)}km
          </Text>
        )}
        {mode != "notSelectedRoute" && (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {(Math.floor(currentDistance * 10) / 10).toFixed(1)} /{" "}
            {goalDistance} km
          </Text>
        )}
      </View>
      {/* 예제 버튼으로 거리 증가 */}
    </View>
  );
};

export default GoalDonutChart;
