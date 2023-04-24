import express from "express";
import { likeController } from "../../controller";

const router = express.Router();

router.post("/", likeController.createLike);
router.delete("/:id", likeController.deleteOneLike);
router.delete("/all/:postId", likeController.deleteLikes);
router.get("/:postId", likeController.getLikes);

export default router;
