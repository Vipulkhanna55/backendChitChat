import like from "../../core/like.js";
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
    const likes = await like.findMany({ where: { postId: postId } });
    return sendResponse(onSuccess(200, "Likes", likes), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const createLike = async (request, response) => {
  try {
    const { postId, userId } = request.body;
    const newLike = await like.insert({ postId, userId });
    return sendResponse(onSuccess(201, "post liked", newLike), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const deleteLikes = async (request, response) => {
  try {
    const deletedLikes = await like.removeMany({
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
    const deletedLike = await like.remove({ where: { id: request.params.id } });
    return sendResponse(onSuccess(200, "like deleted", deletedLike), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

export default { getLikes, createLike, deleteLikes, deleteOneLike };
