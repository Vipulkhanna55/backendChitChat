import server from "../../server/index.js";
import request from "supertest";
import { postModel, userModel } from "../models/index.js";


export const postTestSuite = () => {
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

describe("POST /post", () => {
  describe("given userId, body & attachment", () => {
    test("server should save the post in database", async () => {
      const user = await userModel.findOne({
        where: { email: "sam895@gmail.com" },
      });
      const response = await request(server)
        .post("/post")
        .set("authorization", `Bearer ${token}`)
        .send({
          userId: user.id,
          body: "This is a new post",
          attachment: "",
        });
      expect(response.statusCode).toBe(201);
    });
  });
  describe("when the user does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .post("/post")
        .set("authorization", `Bearer ${token}`)
        .send({
          userId: "cbe75e20-0f28-406d-8852-d8b7e1d7fb3c",
          body: "This is a new post",
          attachment: "",
        });
      expect(response.statusCode).toBe(404);
    });
  });
});

describe("GET /post?id", () => {
  describe("If the post does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .get("/post?id=cbe75e20-0f28-406d-8852-d8b7e1d7fb3c")
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("given the post id in query", () => {
    test("should return the post details", async () => {
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const response = await request(server)
        .get(`/post?id=${post.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /post/usersPost?userId", () => {
  describe("If the user has not created any post", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .get(`/post/usersPost?userId=2728515d-5511-41fa-a06d-d2c18636aae9`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("If the user has created posts", () => {
    test("should return all the posts created by that user", async () => {
      const foundUser = await userModel.findOne({
        where: { email: "sam895@gmail.com" },
      });
      const response = await request(server)
        .get(`/post/usersPost?userId=${foundUser.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /post/feedPost", () => {
  test("should return all the posts in database", async () => {
    const response = await request(server)
      .get(`/post/feedPost`)
      .set("authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("PATCH /post/update/:id", () => {
  describe("If the post does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .patch(`/post/update/8f84b732-36e2-4edb-82c0-ac63a47c3aa9`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("Given body or attachment of the post", () => {
    test("should update the post", async () => {
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const response = await request(server)
        .patch(`/post/update/${post.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("DELETE /post/:id", () => {
  describe("If the post does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .patch(`/post/8f84b732-36e2-4edb-82c0-ac63a47c3aa9`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("Given the post id in params", () => {
    test("should delete the post", async () => {
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const response = await request(server)
        .patch(`/post/update/${post.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
}
