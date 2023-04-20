import signup from './signup.js';
import login from "./login.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: UUID
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *         email:
 *           type: string
 *           description: The email of user
 *         password:
 *           type: string
 *           description: The password of user
 *         profilePic:
 *           type: string
 *           description: The profile picture of the user
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user is an admin
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the user
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: .....
 *       example:
 *         id: 08e247b1-eece-415e-a0c6-05c7cb1ac0c1
 *         name: Sameer
 *         gender: Male
 *         email: sam@xyz.com
 *         password: $2a$10$4tjI/0P.GBRv0HYNDythV.QRlBP170REriML7M8hmIqd42UtKEfY2
 *         profilePic: "" 
 *         isAdmin: false
 *         createdAt: 2023-04-19 18:14:04.971+05:30
 *         updatedAt: 2023-04-19 18:14:04.971+05:30
 */


/**
 * @swagger
 * tags:
 *   name: User
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/src/core/models'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/core/models'
 *       500:
 *         description: Some server error
 *
 */


export default function (app) {
  app.use('/v1/signup', signup);
  app.use("/v1/login", login);
  return app;
}
