import express from "express";
import { postController } from "../../controller";

const router = express.Router();
router.patch("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);
router.route("/").post(postController.savePost).get(postController.getPost);
router.get("/all", postController.getAllPost);
router.get("/allPost", postController.getFeedPosts);
export default router;
