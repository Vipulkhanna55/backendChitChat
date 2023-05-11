import express from "express";
import { commentController } from "../../controller";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     comment:
 *       type: object
 *       required:
 *         - id:
 *         - body:
 *         - postId:
 *         - userId
 *       properties:
 *         id:
 *           type: uuid
 *           description: The auto-generated id of the comment
 *         body:
 *           type: text
 *           description: The body of the comment
 *         postId:
 *           type: uuid
 *           description: The Id of the post
 *         userId:
 *           type: uuid
 *           description: the  id of the user 
 *       example:
 *         body: post Commented 
 *         postId: e5f01b0f-8a6f-4df4-845d-e039bb4c663e
 *         userId: f3c50c1c-334d-46dc-ad0d-93d95ceb0d10
 */

/**
 * @swagger
 * tags:
 *   name: comment
 *   description: The comment managing API
 * /comment:
 *   post:
 *     summary: comment a post
 *     tags: [comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/comment'
 *     security:
 *	     - token: []
 *     responses:
 *       200:
 *         description: The post commented successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       500:
 *         description: Some server error
 *
 */

 /**
 * @swagger
 * /comment/{id}:
 *  delete:
 *      tags:
 *          [comment]
 *      summary:
 *          Delete an comment with commentId   
 *      parameters:
 *          - name: id
 *            in: path
 *            description: The Id of the comment 
 *            required: true  
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The deleted comment of an user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *                      items:
 *                          $ref: '#/components/schemas/comment'
 *          500:
 *              description: Some server error
 */

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
