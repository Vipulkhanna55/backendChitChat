import server from "../../server/index.js";
import request from "supertest";
import { userModel } from "../models/index.js";


export const userTestSuite = () => {
let token;

beforeAll((done) => {
  request(server)
    .post("/login")
    .send({
      email: "sam895@gmail.com",
      password: "Sam123@@@",
    })
    .end((err, response) => {
      token = response.body.data.token; // save the token!
      done();
    });
});

describe("POST /signup", () => {
  describe("given username, email, gender & password", () => {
    test("server should save the user in database", async () => {
      const response = await request(server).post("/signup").send({
        firstName: "John",
        lastName: "Snow",
        gender: "Male",
        email: "john@gmail.com",
        password: "John123@@@",
      });
      expect(response.statusCode).toBe(201);
    });
    test("should specify json in content type header", async () => {
      const response = await request(server).post("/signup").send({
        firstName: "Arya",
        lastName: "Stark",
        gender: "Female",
        email: "arya@gmail.com",
        password: "Arya123@@@",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("when the input data is invalid", () => {
    test("should respond with status code 403", async () => {
      const response = await request(server).post("/signup").send({
        firstName: "Sameer",
        lastName: "Srivastava",
        gender: "Male",
        email: "sameer@gmail.com",
        password: "Sam123",
      });
      expect(response.statusCode).toBe(403);
    });
  });
  describe("when the email already exists in database", () => {
    test("should respond with status code 409", async () => {
      const response = await request(server).post("/signup").send({
        firstName: "John",
        lastName: "Snow",
        gender: "Male",
        email: "john@gmail.com",
        password: "John123@@@",
      });
      expect(response.statusCode).toBe(409);
    });
  });
});

describe("PATCH /user/:id", () => {
  describe("given firstName, lastName, email, password or profilePicture", () => {
    test("should update the user details in database", async () => {
      const foundUser = await userModel.findOne({
        where: { email: "john@gmail.com" },
      });
      const response = await request(server)
        .patch(`/user/${foundUser.id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
          firstName: "Dwyane",
        });
      expect(response.statusCode).toBe(200);
    });
  });
  describe("if user does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .patch("/user/6de6f0a8-56a2-412b-b703-608ae99d34f7")
        .set("authorization", `Bearer ${token}`)
        .send({
          firstName: "Dwyane",
        });
      expect(response.statusCode).toBe(404);
    });
  });
});

// describe("DELETE /user/:id", () => {
//   describe("if user does not exist", () => {
//     test("should respond with status code 404", async () => {
//       const response = await request(server)
//         .delete(`/user/654e562f-c9c0-4f05-b4e5-9a8544d2d3c5`)
//         .set("authorization", `Bearer ${token}`);
//       expect(response.statusCode).toBe(404);
//     });
//   });
//   describe("given the user is admin", () => {
//     test("should be able to delete user from database", async () => {
//       const foundUser = await userModel.findOne({
//         where: { email: "arya@gmail.com" },
//       });
//       const response = await request(server)
//         .delete(`/user/${foundUser.id}`)
//         .set("authorization", `Bearer ${token}`);
//       expect(response.statusCode).toBe(200);
//     });
//   });
// });

describe("GET /user/:id", () => {
  describe("if the user does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .get(`/user/654e562f-c9c0-4f05-b4e5-9a8544d2d3c5`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("given the user id in params", () => {
    test("should return that user details", async () => {
      const foundUser = await userModel.findOne({
        where: { email: "john@gmail.com" },
      });
      const response = await request(server)
        .get(`/user/${foundUser.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /user", () => {
  test("should return all the users in database", async () => {
    const response = await request(server)
      .get(`/user`)
      .set("authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

}