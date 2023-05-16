import server from "../../server/index.js";
import request from "supertest";

export default beforeAll = async () => {
  var authToken;
  const response = await request(server).post("/login").send({
    email: "sam895@gmail.com",
    password: "Sam123@@@",
  });
  authToken = response.body.data.token;
  return authToken;
};

