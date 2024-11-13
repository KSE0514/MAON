import { apiClient } from "../customAxios";

export const getPracticeRoomIdWithRoute = async (routeId) => {
  try {
    const response = await apiClient.post(
      `/route/running/createRunning`,
      {
        routeId: routeId,
        memberId: "dpqls0356",
        recordType: "PRACTICE",
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getPracticeRoomId = async () => {
  try {
    const response = await apiClient.post(
      `/route/running/createRunning`,
      {
        routeId: "",
        memberId: "dpqls0356",
        recordType: "PRACTICE",
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("getPracticeRoomId Error:", error);
  }
};

export const getRaceRoomId = async (routeId) => {
  try {
    const response = await apiClient.post(
      `/route/running/createRunning`,
      {
        routeId: routeId,
        memberId: "dpqls0356",
        recordType: "RACE",
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
