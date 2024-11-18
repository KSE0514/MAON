import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // 위치 데이터 상태
  const [permissionGranted, setPermissionGranted] = useState(false); // 권한 상태

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        setPermissionGranted(false);
        return;
      }
      console.log("Permission granted");
      setPermissionGranted(true); // 권한 승인 상태로 설정
    };

    checkPermissions();
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

  useEffect(() => {
    let interval;

    const startTracking = async () => {
      interval = setInterval(async () => {
        const newLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const coords = newLocation.coords;
        const timestamp = new Date(newLocation.timestamp); // 타임스탬프 변환
        setLocation({ ...coords, timestamp }); // 위치 데이터와 타임스탬프 저장
        console.log("시간: ", timestamp.toLocaleString());
        console.log("현재 위치: ", coords);
      }, 1000); // 1초 간격으로 위치 요청
    };

    if (permissionGranted) {
      startTracking();
    }

    return () => {
      if (interval) {
        clearInterval(interval); // 컴포넌트 언마운트 시 Interval 제거
      }
    };
  }, [permissionGranted]); // 권한 상태가 변경될 때 실행

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};
