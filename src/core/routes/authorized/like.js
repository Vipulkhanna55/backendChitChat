import express from "express";
import { likeController } from "../../controller";

const router = express.Router();

// add a like
router.post("/", likeController.createLike);

// delete a like
router.delete("/:id", likeController.deleteOneLike);

// delete all likes of a post
router.delete("/all/:postId", likeController.deleteLikes);

// get all likes of a post
router.get("/:postId", likeController.getLikes);

export default router;
