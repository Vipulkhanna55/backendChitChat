import express from "express";
import { postController } from "../../controller";

const router = express.Router();
router.patch("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);
router.route("/").post(postController.savePost).get(postController.getPost);
router.get("/usersPost", postController.getAllPost);
router.get("/feedPost", postController.getFeedPosts);
export default router;
