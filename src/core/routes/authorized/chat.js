import express from "express";
import { chatController } from "../../controller";

const router = express.Router();

router.get("/", chatController.getChat);

export default router;
