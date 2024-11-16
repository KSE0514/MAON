import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const fetchPairedWatch = async () => {
  try {
    const storedPairedWatch = await AsyncStorage.getItem("pairedWatch");
    console.log("Stored Paired Watch:", storedPairedWatch);

    Alert.alert("워치연동 여부: ", storedPairedWatch);
    return storedPairedWatch;
  } catch (error) {
    console.error("Error fetching paired watch:", error);
  }
};
export const savePairedWatch = async () => {
  try {
    await AsyncStorage.setItem("pairedWatch", "true");
    console.log("Paired Watch value saved successfully");
  } catch (error) {
    console.error("Error saving Paired Watch:", error);
  }
};
