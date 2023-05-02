import { likeModel } from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";

const getLikes = async (request, response) => {
  try {
    const { postId } = request.params;
    const likes = await likeModel.findMany({ where: { postId: postId } });
    return sendResponse(onSuccess(200, "Likes", likes), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const createLike = async (request, response) => {
  try {
    const { postId, userId } = request.body;
    const newLike = await likeModel.insert({ postId, userId });
    return sendResponse(onSuccess(201, "post liked", newLike), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const deleteLikes = async (request, response) => {
  try {
    const deletedLikes = await likeModel.removeMany({
      where: { postId: request.params.postId },
    });
    return sendResponse(
      onSuccess(200, "likes deleted", deletedLikes),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const deleteOneLike = async (request, response) => {
  try {
    const deletedLike = await likeModel.remove({
      where: { id: request.params.id },
    });
    return sendResponse(onSuccess(200, "like deleted", deletedLike), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

export default { getLikes, createLike, deleteLikes, deleteOneLike };
