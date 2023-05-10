import express from "express";
import { chatController } from "../../controller";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: chat
 *   description: The chat managing API
 * /chat:
 *  get:
 *      tags:
 *          [chat]
 *      summary:
 *          Get  chat of the users  
 *      parameters:
 *          - name: senderId
 *            in: query
 *            description: The senderId of an user 
 *            required: true  
 *          - name: receiverId
 *            in: query
 *            description: The receiverId of an user
 *            required: true
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The all chat of the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *          500:
 *              description: Some server error
 */

router.get("/", chatController.getChat);

export default router;
