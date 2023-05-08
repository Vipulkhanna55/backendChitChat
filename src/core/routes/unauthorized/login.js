import express from "express";
import { loginController } from "../../controller";
const route = express.Router();

route.post("/", loginController);

export default route;
