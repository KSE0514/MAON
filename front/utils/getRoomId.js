const getPracticeRoomIdWithRoute = async (routeId) => {
  const response = await axios.post(`/maon/route/running/createRunning`, {
    routeId: routeId,
    memberId: "dpqls0356",
    routeType: "PRACTICE",
  });
  console.log(response.data);
};
const getPracticeRoomId = async () => {
  const response = await axios.post(`/maon/route/running/createRunning`, {
    memberId: "dpqls0356",
    routeType: "PRACTICE",
  });
  console.log(response.data);
};

const getRaceRoomId = async () => {
  const response = await axios.post(`/maon/route/running/createRunning`, {
    memberId: "dpqls0356",
    routeType: "RACE",
  });
  console.log(response.data);
};
