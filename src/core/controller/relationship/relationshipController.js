import { Op } from "sequelize";
import { relationship } from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";
import { userModel, relationshipModel } from "../../models";

const createRelationship = async ({ followerUserId, followedUserId }) => {
  try {
    const newRelationship = await relationship.insert({
      followerUserId,
      followedUserId,
    });
    const followerUser = await userModel.findOne({
      where: { id: followerUserId },
    });
    const result = {
      newRelationship,
      follower: {
        name: followerUser.firstName + " " + followerUser.lastName,
        profilePicture: followerUser.profilePicture,
      },
    };
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error in creating relationship ", error);
  }
};

const getRelationship = async (request, response) => {
  try {
    const { id } = request.params;
    const relationship = await relationship.getOne({
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

const relationRequests = async (request, response) => {
  try {
    const { id } = request.query;
    const relations = await relationshipModel.findAll({
      where: { followedUserId: id, isRequestAccepted: false },
    });
    return sendResponse(
      onSuccess(200, "relationship found", {
        relations,
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
    const relationships = await relationship.getMany({
      where: {
        [Op.or]: [
          { [Op.and]: [{ followedUserId }, { isRequestAccepted: true }] },
          {
            [Op.and]: [
              { followerUserId: followedUserId },
              { isRequestAccepted: true },
            ],
          },
        ],
      },
    });
    const followers = relationships.map(async (elem) => {
      let followersDataId =
        elem.dataValues.followerUserId == followedUserId
          ? elem.dataValues.followedUserId
          : elem.dataValues.followerUserId;
      const follower = await userModel.findOne({
        where: { id: followersDataId },
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
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const updateRelation = async ({ followerUserId, followedUserId }) => {
  try {
    const foundRelation = await relationship.getOne({
      where: { followerUserId, followedUserId },
    });
    if (foundRelation) {
      const updateRelationship = await relationshipModel.update(
        { isRequestAccepted: true },
        { where: { followerUserId, followedUserId } }
      );
      return updateRelationship;
    }
    return { message: "not found" };
  } catch (error) {
    console.log(error);
  }
};

const removeRelationship = async ({ followerUserId, followedUserId }) => {
  try {
    const foundRelationship = await relationship.getOne({
      where: { followerUserId, followedUserId },
    });
    if (foundRelationship) {
      const deleteRelation = await relationship.remove({
        where: { followerUserId, followedUserId },
      });
      return deleteRelation;
    }
    return { message: "not found" };
  } catch (error) {
    console.log(error);
  }
};

export default {
  createRelationship,
  removeRelationship,
  getAllRelationships,
  getRelationship,
  updateRelation,
  relationRequests,
};
