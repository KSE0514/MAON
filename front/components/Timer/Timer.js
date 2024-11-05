// Timer.js
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import fonts from "../../styles/fonts";

const Timer = ({ showStopModal, runStart, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (runStart && !showStopModal) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [runStart, showStopModal]);

  useEffect(() => {
    if (onTimeUpdate) {
      const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(
        2,
        "0"
      );
      const secs = String(seconds % 60).padStart(2, "0");
      onTimeUpdate(`${hours}:${minutes}:${secs}`);
    }
  }, [seconds, onTimeUpdate]);

  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{ fontSize: 48, fontFamily: fonts.gMarketBold }}
      >{`${Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0")}:${Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0")}:${(seconds % 60)
        .toString()
        .padStart(2, "0")}`}</Text>
    </View>
  );
};

export default Timer;
