import express from "express";
import { userController } from "../../controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
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
 *         firstName: tony 
 *         lastName: stark
 *         gender: male
 *         email: tonystark2007@gmail.com
 *         password: Vipul@1100
 *         profilePicture: exeexxx
 *         isAdmin: true
 */

/**
 * @swagger
 * tags:
 *   name: users
 *   description: The user managing API
 * /v1/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 *
 */

router.post("/", userController.createUser);

export default router;
