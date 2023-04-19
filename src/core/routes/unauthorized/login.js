import express from "express";
import middleware from "../../middleware/middleware.js";
import logincontroller from "../../controller/login/index.js";
const route = express.Router();
route.use(middleware.loginValidator);

route.post("/", logincontroller.logincontroller);

export default route;
