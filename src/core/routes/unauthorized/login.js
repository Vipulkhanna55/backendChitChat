import express from "express";
import middleware from "../../middleware/middleware.js";
import loginController from "../../controller/login/index.js";
const route = express.Router();
route.use(middleware.loginValidator);

route.post("/", loginController.loginController);

export default route;
