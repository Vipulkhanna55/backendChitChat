import express from "express";
import { authController } from "../../controller";

const router = express.Router();

router.post("/2FA", authController.validate);

export default router;
