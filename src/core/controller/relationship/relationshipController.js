import { relationshipModel } from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";
import { userModel } from "../../models";

const createRelationship = async (request, response) => {
  try {
    const { followerUserId, followedUserId } = request.body;
    const relationshipExists = await relationshipModel.findOne({
      where: { followerUserId, followedUserId },
    });
    if (relationshipExists) {
      return sendResponse(
        onError(409, "relationship already exists"),
        response
      );
    }
    const newRelationship = await relationshipModel.insert({
      followerUserId,
      followedUserId,
    });
    return sendResponse(
      onSuccess(201, "relationship created", newRelationship),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const getRelationship = async (request, response) => {
  try {
    const { id } = request.params;
    const relationship = await relationshipModel.getOne({
      where: { id },
    });
    const followerUser = await userModel.findOne({
      where: { id: relationship.followerUserId },
      attributes: ["firstName", "lastName", "profilePicture"],
    });
    const followedUser = await userModel.findOne({
      where: { id: relationship.followedUserId },
      attributes: ["firstName", "lastName", "profilePicture"],
    });
    return sendResponse(
      onSuccess(200, "relationship found", {
        relationship,
        follower: followerUser,
        followed: followedUser,
      }),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const getAllRelationships = async (request, response) => {
  try {
    const { followedUserId } = request.params;
    const relationships = await relationshipModel.getMany({
      where: { followedUserId },
    });
    const followers = relationships.map(async (elem) => {
      const foll = await userModel.findOne({
        where: { id: elem.dataValues.followerUserId },
        attributes: ["id", "firstName", "lastName", "profilePicture"],
      });
      return foll.dataValues;
    });
    return sendResponse(
      onSuccess(200, "relationships found", {
        followedUserId: followedUserId,
        followers: await Promise.all(followers),
      }),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const removeRelationship = async (request, response) => {
  try {
    const { followerUserId } = request.params;
    const removedRelationship = await relationshipModel.remove({
      where: { followerUserId },
    });
    return sendResponse(
      onSuccess(200, "removed relationship", removedRelationship),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

export default {
  createRelationship,
  removeRelationship,
  getAllRelationships,
  getRelationship,
};
