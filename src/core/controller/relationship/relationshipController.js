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

const createRelationship = async ({followerUserId, followedUserId}) => {
  try {
    console.log("Inside +++++++++++++++++++++");
    const relationshipExists = await relationshipModel.getOne({
      where: { followerUserId, followedUserId },
    });
    if (relationshipExists) {
      return;
    }
    console.log("jkfhdshfkhdfhfhhds");
    const newRelationship = await relationshipModel.insert({
      followerUserId,
      followedUserId,
    });
    const followerUser = await userModel.findOne({where: {id: followerUserId}})
    console.log("===================",   {newRelationship, follower: {name: followerUser.firstName + " "+ followerUser.lastName, profilePicture: followerUser.profilePicture}});
    return {newRelationship, follower: {name: followerUser.firstName + " "+ followerUser.lastName, profilePicture: followerUser.profilePicture}};
  } catch (error) {
    console.log("Error in creating relationship ",error);
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
      where: {
        [Op.and]: [{ followedUserId }, { isRequestAccepted: true }],
      },
    });
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
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const updateRelation = async ({followerUserId, followedUserId}) => {
  try {
    const foundRelation = await relationshipModel.getOne({where: {followerUserId, followedUserId}});
    if(foundRelation){
      const updateRelatonship = await relationshipModel.updateOne({isRequestAccepted: true},{where: {followerUserId, followedUserId}})
    }
    
  } catch (error) {
    
  }
}

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
