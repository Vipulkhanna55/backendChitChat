import express from "express";
import { likeController } from "../../controller";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     like:
 *       type: object
 *       required:
 *         - id:
 *         - userId:
 *         - postId:
 *       properties:
 *         id:
 *           type: uuid
 *           description: The auto-generated id of the like
 *         userId:
 *           type: uuid
 *           description: The unique id of the user who has liked the post
 *         postId:
 *           type: uuid
 *           description: The unique id  of the post which the user has liked 
 *       example:
 *         userId: f3c50c1c-334d-46dc-ad0d-93d95ceb0d10
 *         postId: e5f01b0f-8a6f-4df4-845d-e039bb4c663e
 */

/**
 * @swagger
 * tags:
 *   name: like
 *   description: The like managing API
 * /v1/like:
 *   post:
 *     summary: like a post
 *     tags: [like]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/like'
 *     security:
 *	     - token: []
 *     responses:
 *       200:
 *         description: The post liked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/like'
 *       500:
 *         description: Some server error
 *
 */

 /**
 * @swagger
 * /like/{id}:
 *  delete:
 *      tags:
 *          [like]
 *      summary:
 *          Delete an like with like id   
 *      parameters:
 *          - name: id
 *            in: path
 *            description: The Id of the like 
 *            required: true  
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The deleted like count of an user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *                      items:
 *                          $ref: '#/components/schemas/like'
 *          500:
 *              description: Some server error
 */
// add a like
router.post("/", likeController.createLike);

// delete a like
router.delete("/:id", likeController.deleteOneLike);

// delete all likes of a post
router.delete("/all/:postId", likeController.deleteLikes);

// get all likes of a post
router.get("/:postId", likeController.getLikes);

export default router;
