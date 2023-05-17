import server from "../../server/index.js";
import request from "supertest";

const createUser = async () => {
  const response = await request(server).post("/signup").send({
    firstName: "Sameer",
    lastName: "Srivastava",
    gender: "Male",
    email: "sam895@gmail.com",
    password: "Sam123@@@",
  });
}

export default beforeAll = async () => {
  await createUser();
  var authToken;
  const response = await request(server).post("/login").send({
    email: "sam895@gmail.com",
    password: "Sam123@@@",
  });
  authToken = response.body.data.token;
  return authToken;
};

