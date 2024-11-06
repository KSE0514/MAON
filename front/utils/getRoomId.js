// export const getPracticeRoomIdWithRoute = async (routeId) => {
//   const response = await runClient.post(`/maon/route/running/createRunning`, {
//     routeId: routeId,
//     memberId: "dpqls0356",
//     routeType: "PRACTICE",
//   });
//   console.log(response.data);
// };

// export const getPracticeRoomId = async () => {
//   console.log("hello?함수까진 왔어요");
//   const response = await runClient.post(`/maon/route/running/createRunning`, {
//     memberId: "dpqls0356",
//     routeType: "PRACTICE",
//   });
//   console.log(response.data);
// };

// export const getRaceRoomId = async () => {
//   const response = await runClient.post(`/maon/route/running/createRunning`, {
//     memberId: "dpqls0356",
//     routeType: "RACE",
//   });
//   console.log(response.data);
// };
import axios from "axios";

export const getPracticeRoomIdWithRoute = async (routeId) => {
  const response = await axios.post(
    `http://localhost:18030/maon/route/running/createRunning`,
    {
      routeId: routeId,
      memberId: "dpqls0356",
      routeType: "PRACTICE",
    }
  );
  console.log(response.data);
};

export const getPracticeRoomId = async () => {
  console.log("hello?함수까진 왔어요");
  const response = await axios.post(
    `http://localhost:18030/route/running/createRunning`,
    { routeId: "", memberId: "dpqls0356", routeType: "PRACTICE" }
  );
  console.log(response.data);
};

export const getRaceRoomId = async () => {
  const response = await axios.post(
    `http://localhost:18030/maon/route/running/createRunning`,
    {
      memberId: "dpqls0356",
      routeType: "RACE",
    }
  );
  console.log(response.data);
};
