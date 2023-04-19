import express from "express";
const route = express.Router();
const signupController = (req, res) => {
  res.send("Hello there");
};
route.post("/", signupController);

export default route;
