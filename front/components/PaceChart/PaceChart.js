import React, { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const PaceChart = () => {
  const screenWidth = Dimensions.get("window").width - 60; // 너비를 화면에 맞춤
  const [chartHeight, setChartHeight] = useState(0);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setChartHeight(height);
  };

  return (
    <View style={{ flex: 1 }} onLayout={handleLayout}>
      {chartHeight > 0 && (
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={screenWidth} // 화면 너비에 맞춤
          height={chartHeight} // 동적으로 부모 View의 높이에 맞춤
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // 선택적, 세로 축의 간격 조정
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // 소수점 자리
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier // 곡선 형태로 만듦
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default PaceChart;
