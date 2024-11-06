import { apiClient } from "../customAxios";

export const getPracticeRoomIdWithRoute = async (routeId) => {
  try {
    const response = await apiClient.post(`/route/running/createRunning`, {
      routeId: routeId,
      memberId: "dpqls0356",
      routeType: "PRACTICE",
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getPracticeRoomId = async () => {
  try {
    const response = await apiClient.post(`/route/running/createRunning`, {
      routeId: "",
      memberId: "dpqls0356",
      routeType: "PRACTICE",
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getRaceRoomId = async (routeId) => {
  try {
    const response = await apiClient.post(`/route/running/createRunning`, {
      routeId: routeId,
      memberId: "dpqls0356",
      routeType: "RACE",
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
