import express from "express";
import { userController } from "../../controller";

const router = express.Router();

router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getUsers);

export default router;
