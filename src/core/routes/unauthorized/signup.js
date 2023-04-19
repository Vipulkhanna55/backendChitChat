import express from "express";
import { userController } from "../../controller";

const router = express.Router();

router.post("/signup", userController.createUser);

export default router;
