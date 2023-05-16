import server from "../../server/index.js";
import request from "supertest";
import { postModel, userModel, likeModel } from "../models/index.js";

export const likeTestSuite = () => {
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

  describe("POST /like", () => {
    describe("when the user does not exist", () => {
      test("should respond with status code 404", async () => {
        const post = await postModel.findOne({
          where: { body: "This is a new post" },
        });
        const response = await request(server)
          .post("/like")
          .set("authorization", `Bearer ${token}`)
          .send({
            userId: "cbe75e20-0f28-406d-8852-d8b7e1d7fb3c",
            postId: post.id,
          });
        expect(response.statusCode).toBe(404);
      });
    });
    describe("when the post does not exist", () => {
      test("should respond with status code 404", async () => {
        const user = await userModel.findOne({
          where: { email: "sam895@gmail.com" },
        });
        const response = await request(server)
          .post("/like")
          .set("authorization", `Bearer ${token}`)
          .send({
            postId: "cbe75e20-0f28-406d-8852-d8b7e1d7fb3c",
            userId: user.id,
          });
        expect(response.statusCode).toBe(404);
      });
    });
    describe("Given the post id & user id", () => {
      test("should create a like and save it in database", async () => {
        const user = await userModel.findOne({
          where: { email: "sam895@gmail.com" },
        });
        const post = await postModel.findOne({
          where: { body: "This is a new post" },
        });
        const response = await request(server)
          .post("/like")
          .set("authorization", `Bearer ${token}`)
          .send({
            postId: post.id,
            userId: user.id,
          });
        expect(response.statusCode).toBe(201);
      });
    });
  });

  describe("GET /like/:postId", () => {
    describe("If the post does not exist", () => {
      test("Should respond with status code 404", async () => {
        const response = await request(server)
          .get("/like/cbe75e20-0f28-406d-8852-d8b7e1d7fb3c")
          .set("authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
      });
    });
    describe("If the post exist & is liked", () => {
      test("Should respond with status code 200", async () => {
        const post = await postModel.findOne({
          where: { body: "This is a new post" },
        });
        const response = await request(server)
          .get(`/like/${post.id}`)
          .set("authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("DELETE /like/:id", () => {
    describe("when the like does not exist", () => {
      test("should respond with status code 404", async () => {
        const response = await request(server)
          .delete("/like/cbe75e20-0f28-406d-8852-d8b7e1d7fb3c")
          .set("authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
      });
    });
    describe("Given the like id in params", () => {
      test("should delete the like from database", async () => {
        const post = await postModel.findOne({
          where: { body: "This is a new post" },
        });
        const like = await likeModel.findOne({
          where: { postId: post.id },
        });
        const response = await request(server)
          .delete(`/like/${like.id}`)
          .set("authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
      });
    });
  });
};
