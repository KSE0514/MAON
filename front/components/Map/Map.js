import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
import { Text, View, StyleSheet, Alert, Image } from "react-native";
import * as Location from "expo-location";
import MapStyle from "./MapViewStyle.json";
import color from "../../styles/colors";
import { baseGps } from "../../text_gpx_data";
import { LocationContext } from "../../utils/LocationProvider";
export default function Map({
  navigation,
  setShowStartModal,
  runStart,
  setRunningDistance,
  mode,
  onLocationChange, // 위치 변경 콜백
  connectedWatch,
  running,
  currentLocation,
  startPoint, // 시작점 좌표 prop 추가
  selectedRoute,
  runRoute,
}) {
  //현재 위치를 받아옴
  const location = useContext(LocationContext);
  // 지도 준비 상태
  const [isMapReady, setIsMapReady] = useState(false);
  //내 위치
  const [mapRegion, setmapRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  //polyline
  const [gps, setGps] = useState([]);

  //마커
  const [markers, setMarkers] = useState([]);

  // currentLocation이 변경될 때마다 마커 위치 업데이트
  useEffect(() => {
    if (currentLocation) {
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) =>
          marker.id === "current-point"
            ? {
                ...marker,
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }
            : marker
        )
      );

      // 지도 위치도 업데이트
      setmapRegion({
        ...mapRegion,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  }, [currentLocation]);

  /**
   * 내 위치 첫 위치 설정
   */
  useEffect(() => {
    const getLocation = async () => {
      console.log("Map: ", location.latitude, " ", location.longitude);
      setmapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
      setMarkers((prevMarkers) => {
        // 기존 마커들 유지
        const updatedMarkers = [...prevMarkers];

        // mode가 "notSelectedRoute"일 때만 "start-point" 마커를 추가
        if (mode === "notSelectedRoute") {
          updatedMarkers.push({
            id: "start-point",
            latitude: location.latitude,
            longitude: location.longitude,
            title: "Start Point",
            description: "This is the starting point",
          });
        }

        // 항상 "current-point" 마커 추가 또는 업데이트
        const currentPointIndex = updatedMarkers.findIndex(
          (marker) => marker.id === "current-point"
        );

        const currentPointMarker = {
          id: "current-point",
          latitude: location.latitude,
          longitude: location.longitude,
          title: "Current Point",
          description: "This is the current point",
        };

        // "current-point"가 이미 있다면 업데이트, 없으면 추가
        if (currentPointIndex !== -1) {
          updatedMarkers[currentPointIndex] = currentPointMarker;
        } else {
          updatedMarkers.push(currentPointMarker);
        }

        return updatedMarkers;
      });
      setIsMapReady(true);
    };

    getLocation();
    if (mode === "notSelectedRoute") {
      setShowStartModal(true);
    }
  }, []);

  /**
   * 1초마다 위치 변경하기 -> 전달하는 함수 실행
   */
  const handleUserLocationChange = () => {
    console.log("위치변경 함수 실행 ", runStart);
    if (runStart) {
      console.log("Map: ", location);
      const newCoordinate = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      console.log(
        "트래킹한 값 기반으로 데이터 변경 예정",
        newCoordinate.latitude,
        newCoordinate.longitude
      );
      setGps((prevGps) => {
        if (prevGps.length > 0) {
          const lastPosition = prevGps[prevGps.length - 1];

          const distanceIncrement = calculateDistance(
            lastPosition,
            newCoordinate
          );
          setRunningDistance(
            (prevDistance) => prevDistance + distanceIncrement
          );
        }
        return [
          ...prevGps,
          {
            latitude: newCoordinate.latitude,
            longitude: newCoordinate.longitude,
          },
        ];
      });
      onLocationChange(newCoordinate);

      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) =>
          marker.id === "current-point"
            ? {
                ...marker,
                latitude: newCoordinate.latitude,
                longitude: newCoordinate.longitude,
              }
            : marker
        )
      );
      setmapRegion(newCoordinate);
    }
  };

  useEffect(() => {
    const startTracking = async () => {
      handleUserLocationChange();
    };

    //시작이 되었고 워치 연동이 안된 경우
    if (runStart && !connectedWatch) {
      console.log("tracking 시도함");
      startTracking();
    } else {
      console.log("트래킹 멈춤");
    }
  }, [runStart, location]); // runStart가 변경될 때마다 실행

  // 시작점 추가 또는 업데이트
  useEffect(() => {
    if (startPoint) {
      setMarkers((prevMarkers) => {
        // "start-point" 마커가 이미 존재하는지 확인
        const startPointIndex = prevMarkers.findIndex(
          (marker) => marker.id === "start-point"
        );

        const startPointMarker = {
          id: "start-point",
          latitude: startPoint.latitude,
          longitude: startPoint.longitude,
          title: "Start Point",
          description: "This is the starting point",
        };

        if (startPointIndex !== -1) {
          // 기존 마커가 있으면 업데이트
          prevMarkers[startPointIndex] = startPointMarker;
          return [...prevMarkers];
        } else {
          // 없으면 새로 추가
          return [...prevMarkers, startPointMarker];
        }
      });
    }
  }, [startPoint]);

  //거리계산
  const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; // 지구의 반지름 (미터)
    const lat1 = (coord1.latitude * Math.PI) / 180;
    const lat2 = (coord2.latitude * Math.PI) / 180;
    const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const deltaLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    console.log("계산한 거리 값: ", (R * c) / 1000);
    return (R * c) / 1000; // 거리 (킬로미터)
  };
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        {isMapReady && (
          <MapView
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={MapStyle}
            style={{ alignSelf: "stretch", height: "100%" }}
            region={mapRegion}
            showsUserLocation={false}>
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}>
                {/* 시작 */}
                {marker.title == "Start Point" && (
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 7.5,
                      borderRadius: 10,
                      shadowColor: "#FFC700",
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      elevation: 15, // Android 그림자 효과
                    }}></View>
                )}
                {/* 내 위치 */}
                {marker.title == "Current Point" && (
                  <Image
                    source={require("../../assets/images/Union.png")} // 이미지 경로
                    style={{
                      width: 30, // 원하는 너비
                      height: 38, // 원하는 높이
                      resizeMode: "contain", // 이미지를 짤리지 않게 표시
                    }}
                  />
                )}
                {/*고스트 위치 */}
                {/* 물 위치 */}
                {/* 반환 위치 */}
              </Marker>
            ))}
            {mode === "selectedRoute" ? (
              <>
                <Polyline
                  coordinates={selectedRoute}
                  strokeColor={color.grey}
                  strokeWidth={6}
                />
                <Polyline
                  coordinates={runRoute}
                  strokeColor={color.light_orange}
                  strokeWidth={6}
                />
              </>
            ) : (
              <Polyline
                coordinates={gps}
                strokeColor={color.light_orange}
                strokeWidth={6}
              />
            )}
          </MapView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
