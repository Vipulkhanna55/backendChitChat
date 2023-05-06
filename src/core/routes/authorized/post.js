import express from "express";
import { postController } from "../../controller";
/**
 * @swagger
 * components:
 *   schemas:
 *     post:
 *       type: object
 *       required:
 *         - id:
 *         - body:
 *         - attachment:
 *         - userId
 *       properties:
 *         id:
 *           type: uuid
 *           description: The auto-generated id of the user
 *         body:
 *           type: text
 *           description: The body of the post
 *         attachment:
 *           type: text
 *           description: The attachment of the post
 *         userId:
 *           type: uuid
 *           description: the user id of the user 
 *       example:
 *         body: post added 
 *         attachment: exeexxxx
 *         userId: f3106cec-ab6a-4b39-9e2a-bbcb543daf76
 */

/**
 * @swagger
 * tags:
 *   name: posts
 *   description: The post managing API
 * /v1/post:
 *   post:
 *     summary: save a post
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/post'
 *     responses:
 *       200:
 *         description: The created post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/post'
 *       500:
 *         description: Some server error
 *
 */


const router = express.Router();
router.patch("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);
router.route("/").post(postController.savePost).get(postController.getPost);
router.get("/all", postController.getAllPost);
router.get("/allPost", postController.getFeedPosts);
export default router;
