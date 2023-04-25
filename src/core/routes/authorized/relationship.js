import express from "express";
import { relationshipController } from "../../controller";

const router = express.Router();

// create a new relationship
router.post("/", relationshipController.createRelationship);

// delete a relationship
router.delete("/:followerId", relationshipController.removeRelationship);

// get all relationships of a user
router.get("/all/:followedUserId", relationshipController.getAllRelationships);

// get a single relationship
router.get("/:followerId", relationshipController.getRelationship);

export default router;
