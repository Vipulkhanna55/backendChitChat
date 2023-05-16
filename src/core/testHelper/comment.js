import server from "../../server/index.js";
import request from "supertest";
import { postModel, userModel, commentModel } from "../models/index.js";

export const commentTestSuite = () => {

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

describe("POST /comment", () => {
  describe("If the comment body is empty", () => {
    test("should respond with status code 400", async () => {
      const user = await userModel.findOne({
        where: { email: "sam895@gmail.com" },
      });
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const response = await request(server)
        .post("/comment")
        .set("authorization", `Bearer ${token}`)
        .send({
          userId: user.id,
          postId: post.id,
          body: "",
        });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("when the user does not exist", () => {
    test("should respond with status code 404", async () => {
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const response = await request(server)
        .post("/comment")
        .set("authorization", `Bearer ${token}`)
        .send({
          userId: "cbe75e20-0f28-406d-8852-d8b7e1d7fb3c",
          body: "This is a new comment",
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
        .post("/comment")
        .set("authorization", `Bearer ${token}`)
        .send({
          postId: "cbe75e20-0f28-406d-8852-d8b7e1d7fb3c",
          body: "This is a new comment",
          userId: user.id,
        });
      expect(response.statusCode).toBe(404);
    });
  });
  describe("Given the userId, postId & body", () => {
    test("should save the comment in database", async () => {
      const user = await userModel.findOne({
        where: { email: "sam895@gmail.com" },
      });
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const response = await request(server)
        .post("/comment")
        .set("authorization", `Bearer ${token}`)
        .send({
          postId: post.id,
          body: "This is a new comment",
          userId: user.id,
        });
      expect(response.statusCode).toBe(201);
    });
  });
});

describe("GET /comment/all/:postId", () => {
  describe("when the post does not exist", () => {
    test("should respond with status code 404", async () => {
      const user = await userModel.findOne({
        where: { email: "sam895@gmail.com" },
      });
      const response = await request(server)
        .get("/comment/all/cbe75e20-0f28-406d-8852-d8b7e1d7fb3c")
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("Given postId in params", () => {
    test("should return all the comments on that post", async () => {
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const response = await request(server)
        .get(`/comment/all/${post.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /comment/:id", () => {
  describe("when the comment does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .get("/comment/cbe75e20-0f28-406d-8852-d8b7e1d7fb3c")
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("Given comment id in params", () => {
    test("should return that comment", async () => {
      const comment = await commentModel.findOne({
        where: { body: "This is a new comment" },
      });
      const response = await request(server)
        .get(`/comment/${comment.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("PATCH /comment/:id", () => {
  describe("when the comment does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .patch("/comment/cbe75e20-0f28-406d-8852-d8b7e1d7fb3c")
        .set("authorization", `Bearer ${token}`)
        .send({
          body: "This is a new comment",
        });
      expect(response.statusCode).toBe(404);
    });
  });
  describe("If the comment body is empty", () => {
    test("should respond with status code 400", async () => {
      const comment = await commentModel.findOne({
        where: { body: "This is a new comment" },
      });
      const response = await request(server)
        .patch(`/comment/${comment.id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
          body: "",
        });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("If the comment body is given", () => {
    test("should update the comment body", async () => {
      const comment = await commentModel.findOne({
        where: { body: "This is a new comment" },
      });
      const response = await request(server)
        .patch(`/comment/${comment.id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
          body: "This is a new comment",
        });
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("DELETE /comment/:id", () => {
  describe("when the comment does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .delete("/comment/cbe75e20-0f28-406d-8852-d8b7e1d7fb3c")
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("Given the comment id in params", () => {
    test("should delete the comment from database", async () => {
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const comment = await commentModel.findOne({
        where: { postId: post.id },
      });
      const response = await request(server)
        .delete(`/comment/${comment.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("DELETE /comment/all/:postId", () => {
  describe("when the post does not exist", () => {
    test("should respond with status code 404", async () => {
      const response = await request(server)
        .delete("/comment/all/cbe75e20-0f28-406d-8852-d8b7e1d7fb3c")
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
    });
  });
  describe("Given the post id in params", () => {
    test("should delete all the comments on that post", async () => {
      const post = await postModel.findOne({
        where: { body: "This is a new post" },
      });
      const response = await request(server)
        .delete(`/comment/all/${post.id}`)
        .set("authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

}
