import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
import { Text, View, StyleSheet, Alert, Image } from "react-native";
import * as Location from "expo-location";
import MapStyle from "./MapViewStyle.json";
import color from "../../styles/colors";
import { baseGps } from "../../text_gpx_data";
export default function Map({
  navigation,
  setShowStartModal,
  runStart,
  setRunningDistance,
  mode,
  onLocationChange, // 위치 변경 콜백
  connectedWatch,
}) {
  const [mapRegion, setmapRegion] = useState({
    latitude: 36.7987869,
    longitude: 127.0757584,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const [gps, setGps] = useState([]);

  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const locationInterval = useRef(null);

  const [markers, setMarkers] = useState([]);
  /**
   * 위치 허가 여부를 판단
   */
  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "denied") {
        Alert.alert(
          "위치 불러오기 오류",
          `위치 접근 권한이 거부되어있습니다.\n설정으로 이동해 위치정보를 허용해주세요`,
          [
            {
              text: "확인",
              onPress: () => navigation.navigate("Home"),
            },
          ],
          { cancelable: false }
        );
        return;
      }

      if (status !== "granted") {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync({});
        if (newStatus === "denied") {
          Alert.alert(
            "위치 불러오기 오류",
            `위치 접근 권한이 거부되어있습니다.\n설정으로 이동해 위치정보를 허용해주세요`,
            [
              {
                text: "확인",
                onPress: () => navigation.navigate("Home"),
              },
            ],
            { cancelable: false }
          );
          return;
        }
        setLocationPermissionGranted(true); // 권한이 허가됨을 저장
      } else {
        setLocationPermissionGranted(true);
      }
    };

    requestLocationPermission();
  }, []);

  /**
   * 내 위치 받아오기
   */
  useEffect(() => {
    const getLocation = async () => {
      if (locationPermissionGranted) {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setmapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          {
            id: "start-point",
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            title: "Start Point",
            description: "This is the starting point",
          },
          {
            id: "current-point",
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            title: "Current Point",
            description: "This is the starting point",
          },
        ]);
      }
    };

    getLocation();
    setShowStartModal(true);
  }, [locationPermissionGranted]);

  /**
   * 1초마다 위치 변경하기
   */
  const handleUserLocationChange = (location) => {
    if (runStart) {
      const newCoordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };

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
        return [...prevGps, newCoordinate];
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
      locationInterval.current = setInterval(async () => {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        handleUserLocationChange(location);
      }, 1000); // 1초마다 위치 업데이트
    };

    if (runStart && !connectedWatch) {
      startTracking();
    } else {
      // runStart가 false로 변경되면 위치 추적 중지
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
        locationInterval.current = null; // interval 초기화
      }
    }

    // 컴포넌트 언마운트 시 위치 추적 중지
    return () => {
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
      }
    };
  }, [runStart]); // runStart가 변경될 때마다 실행

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

    return (R * c) / 1000; // 거리 (킬로미터)
  };
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={{ alignSelf: "stretch", height: "100%" }}
          region={mapRegion}
          showsUserLocation={false}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            >
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
                  }}
                ></View>
              )}
              {/* 내 위치 */}
              {marker.title == "Current Point" && (
                <Image
                  source={require("../../assets/images/Union.png")} // 이미지 경로
                  style={{
                    width: 34, // 원하는 너비
                    height: 42, // 원하는 높이
                    resizeMode: "contain", // 이미지를 짤리지 않게 표시
                  }}
                />
              )}
              {/*고스트 위치 */}
              {/* 물 위치 */}
              {/* 반환 위치 */}
            </Marker>
          ))}
          {mode === "trackingRun" ? (
            <Polyline
              coordinates={baseGps}
              strokeColor={color.light_orange}
              strokeWidth={6}
            />
          ) : (
            <Polyline
              coordinates={gps}
              strokeColor={color.light_orange}
              strokeWidth={6}
            />
          )}
        </MapView>
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
