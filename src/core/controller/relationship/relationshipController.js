import { Op } from "sequelize";
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
    const relationshipExists = await relationshipModel.getOne({
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
    return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
  }
};

const getRelationship = async (request, response) => {
  try {
    const { id } = request.params;
    const relationship = await relationshipModel.getOne({
      where: { id },
    });
    if (!relationship) {
      return sendResponse(onError(404, "relationship not found"), response);
    }
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
    return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
  }
};

const getAllRelationships = async (request, response) => {
  try {
    const { followedUserId } = request.params;
    const user = await userModel.findOne({ where: { id: followedUserId } });
    if (!user) {
      return sendResponse(onError(404, "User does not exist"), response);
    }
    const relationships = await relationshipModel.getMany({
      where: {
        [Op.and]: [{ followedUserId }, { isRequestAccepted: true }],
      },
    });
    if (!relationships) {
      return sendResponse(onError(404, "relationships not found"), response);
    }
    const followers = relationships.map(async (elem) => {
      const follower = await userModel.findOne({
        where: { id: elem.dataValues.followerUserId },
        attributes: ["id", "firstName", "lastName", "profilePicture"],
      });
      return follower.dataValues;
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
    return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
  }
};

const removeRelationship = async (request, response) => {
  try {
    const { id } = request.params;
    const foundRelation = await relationshipModel.getOne({
      where: { id },
    });
    if (!foundRelation) {
      return sendResponse(onError(404, "relationship not found"), response);
    }
    const removedRelationship = await relationshipModel.remove({
      where: { id },
    });
    return sendResponse(
      onSuccess(200, "removed relationship successfully"),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
  }
};

export default {
  createRelationship,
  removeRelationship,
  getAllRelationships,
  getRelationship,
};
