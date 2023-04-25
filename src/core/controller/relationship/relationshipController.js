import { relationshipModel } from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";

const createRelationship = async (request, response) => {
  try {
    const { followerId, followedUserId } = request.body;
    const newRelationship = await relationshipModel.insert({
      followerId,
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
      const { followerId } = request.params;
      const relationship = await relationshipModel.getOne({where: {followerId}});
      return sendResponse(
        onSuccess(200, "relationship found", relationship),
        response
      );
    } catch (error) {
      globalCatch(request, error);
      return sendResponse(onError(500, messageResponse.ERROR), response);
    }
}

const getAllRelationships = async (request, response) => {
    try {
      const { followedUserId } = request.params;
      const relationships = await relationshipModel.getMany({where: {followedUserId}});
      return sendResponse(
        onSuccess(200, "relationships found", relationships),
        response
      );
    } catch (error) {
      globalCatch(request, error);
      return sendResponse(onError(500, messageResponse.ERROR), response);
    }
}

const removeRelationship = async (request, response) => {
    try {
      const { followerId } = request.params;
      const removedRelationship = await relationshipModel.remove({where: {followerId}});
      return sendResponse(
        onSuccess(200, "removed relationship", removedRelationship),
        response
      );
    } catch (error) {
      globalCatch(request, error);
      return sendResponse(onError(500, messageResponse.ERROR), response);
    }
}

export default { createRelationship, removeRelationship, getAllRelationships, getRelationship };