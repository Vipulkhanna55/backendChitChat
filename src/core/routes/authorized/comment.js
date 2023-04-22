import express from "express";
import { commentController } from "../../controller";

const router = express.Router();

router.post("/", commentController.createComment);
router.patch("/update/:id", commentController.updateComment);
router.delete("/delete/:id", commentController.deleteOneComment);
router.get("/:postId", commentController.getComments);
router.get("/:id", commentController.getOneComment);
router.delete("/delete/:postId", commentController.deleteComments);

export default router;
