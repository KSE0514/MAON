export const fetchPairedWatch = async () => {
  try {
    const storedPairedWatch = await AsyncStorage.getItem("pairedWatch");
    console.log("Stored Paired Watch:", storedPairedWatch);
    return storedPairedWatch;
  } catch (error) {
    console.error("Error fetching paired watch:", error);
  }
};
