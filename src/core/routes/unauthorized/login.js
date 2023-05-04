import express from "express";
import { loginController } from "../../controller";
const route = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     userlogin:
 *       type: object
 *       required:
 *         - id:
 *         - firstName:
 *         - lastName:
 *         - gender
 *         - email
 *         - password
 *         - profilePicture
 *         - isAdmin
 *       properties:
 *         id:
 *           type: uuid
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         gender:
 *           type: enum
 *           description: gender of the user 
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         profilePicture:
 *           type: text('long')
 *           description: The profile picture of the user
 *         isAdmin:
 *           type: boolean
 *           description: if user is admin
 *       example:
 *         email: tony22@gmail.com
 *         password: Vipul@1100
 */
/**
 * @swagger
 * tags:
 *   name: users
 *   description: The users managing API
 * /v1/login:
 *   post:
 *     summary: login a user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userlogin'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userlogin'
 *       500:
 *         description: Some server error
 *
 */


route.post("/", loginController);

export default route;
