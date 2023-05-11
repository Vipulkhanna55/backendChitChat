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
 *         userId: f3c50c1c-334d-46dc-ad0d-93d95ceb0d10
 */

/**
 * @swagger
 * tags:
 *   name: post
 *   description: The post managing API
 * /post:
 *   post:
 *     summary: save a post
 *     tags: [post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/post'
 *     security:
 *	     - token: []
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

/**
 * @swagger
 * /post/feedPost:
 *  get:
 *      tags:
 *          [post]
 *      summary:
 *          Get all posts on the feed
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The all posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *                      items:
 *                          $ref: '#/components/schemas/post'
 *          500:
 *              description: Some server error
 */

/**
 * @swagger
 * /post:
 *  get:
 *      tags:
 *          [post]
 *      summary:
 *          Get all posts of the users  
 *      parameters:
 *          - name: id
 *            in: query
 *            description: The Id of an user 
 *            required: true  
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The all posts of an user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *                      items:
 *                          $ref: '#/components/schemas/post'
 *          500:
 *              description: Some server error
 */

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *      tags:
 *          [post]
 *      summary:
 *          Delete an post with postId   
 *      parameters:
 *          - name: id
 *            in: path
 *            description: The Id of the post 
 *            required: true  
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The all posts of an user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *                      items:
 *                          $ref: '#/components/schemas/post'
 *          500:
 *              description: Some server error
 */

/**
 * @swagger
 * /post/update/{id}:
 *  patch:
 *      tags:
 *          [post]
 *      summary:
 *          Update an post with postId   
 *      parameters:
 *          - name: id
 *            in: path
 *            description: The Id of the post 
 *            required: true 
 *          - name: body
 *            in: body
 *            description: The body to be updated of the post 
 *            required: true 
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The all posts of an user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *                      items:
 *                          $ref: '#/components/schemas/post'
 *          500:
 *              description: Some server error
 */




const router = express.Router();
router.patch("/update/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.route("/").post(postController.savePost).get(postController.getPost);
router.get("/usersPost", postController.getAllPost);
router.get("/feedPost", postController.getFeedPosts);
export default router;




