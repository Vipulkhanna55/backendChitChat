import express from "express";
import { commentController } from "../../controller";

const router = express.Router();

// create a new comment
router.post("/", commentController.createComment);

// update a comment
router.patch("/:id", commentController.updateComment);

// delete a comment
router.delete("/:id", commentController.deleteOneComment);

// get all comments of a post
router.get("/all/:postId", commentController.getComments);

// get a single comment
router.get("/:id", commentController.getOneComment);

// delete all comments of a post
router.delete("/all/:postId", commentController.deleteComments);

export default router;
