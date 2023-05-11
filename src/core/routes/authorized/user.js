import express from "express";
import { userController } from "../../controller";
import { isAdmin } from "../../core";

const router = express.Router();

// update a user
router.patch("/:id", userController.updateUser);

// delete a user
router.delete("/:id", isAdmin(userController.deleteUser));

// get all users
router.get("/", userController.getUsers);

//get a single user
router.get("/:id", userController.getUser);

export default router;
