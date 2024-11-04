import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
import { Text, View, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import MapStyle from "./MapViewStyle.json";

export default function Map({ navigation, setShowStartModal, runStart }) {
  const [mapRegion, setmapRegion] = useState({
    latitude: 36.7987869,
    longitude: 127.0757584,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [gps, setGps] = useState([]);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

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
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    };

    getLocation();
    setShowStartModal(true);
  }, [locationPermissionGranted]);

  /**
   * 1초마다 위치 변경하기
   */
  const handleUserLocationChange = (e) => {
    if (runStart) {
      const newCoordinate = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      };
      setGps((prevGps) => [...prevGps, newCoordinate]);
      setmapRegion(newCoordinate);
    }
  };

  useEffect(() => {
    let locationInterval;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      locationInterval = setInterval(async () => {
        const location = await Location.getCurrentPositionAsync({});
        handleUserLocationChange(location);
      }, 1000); // 1초마다 위치 업데이트
    };

    if (runStart) {
      startTracking();
    }

    return () => {
      if (locationInterval) {
        clearInterval(locationInterval);
      }
    };
  }, [runStart]);

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={{ alignSelf: "stretch", height: "100%" }}
          region={mapRegion}
          showsUserLocation={true}
        >
          <Marker coordinate={mapRegion}>
            <Callout>
              <Text>This is Callout</Text>
            </Callout>
          </Marker>
          <Polyline coordinates={gps} strokeColor="#4e90f7" strokeWidth={6} />
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
