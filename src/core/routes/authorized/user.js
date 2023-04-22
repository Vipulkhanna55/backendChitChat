import express from "express";
import { userController } from "../../controller";

const router = express.Router();

router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/", userController.getUsers);

export default router;
