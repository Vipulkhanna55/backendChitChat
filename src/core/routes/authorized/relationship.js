import express from "express";
import { relationshipController } from "../../controller";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: relationship
 *   description: The relation managing API
 * /relationship/all/{followedUserId}:
 *  get:
 *      tags:
 *          [relationship]
 *      summary:
 *          Get  relations of the user 
 *      parameters:
 *          - name: followedUserId
 *            in: path
 *            description: The Follower user ID  
 *            required: true  
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The all Followers of the user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *          500:
 *              description: Some server error
 */

/**
 * @swagger
 * /relationship/request:
 *  get:
 *      tags:
 *          [relationship]
 *      summary:
 *          Get  relations of the users
 *      parameters:
 *          - name: id
 *            in: query
 *            description: The Id of the user   
 *            required: true  
 *      security:
 *          - token: 
 *              []
 *      responses:
 *          200:
 *              description: The all Followers of the user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              array
 *          500:
 *              description: Some server error
 */

// create a new relationship
router.post("/", relationshipController.createRelationship);

// get friend requests
router.get("/request", relationshipController.relationRequests);

// delete a relationship
router.delete("/:id", relationshipController.removeRelationship);

// get all relationships of a user
router.get("/all/:followedUserId", relationshipController.getAllRelationships);

// get a single relationship
router.get("/:id", relationshipController.getRelationship);

export default router;
