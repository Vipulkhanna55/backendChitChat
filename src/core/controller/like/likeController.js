import { likeModel } from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
  memcache,
} from "../../helper";
import { postModel, userModel } from "../../models";

const getLikes = async (request, response) => {
  try {
    const { postId } = request.params;
    const cachedData = memcache.verifyCache(postId, cachedKey.LIKE);
    if (cachedData) {
      return sendResponse(onSuccess(200, "Likes", cachedData), response);
    }
    const post = await postModel.findOne({ where: { id: postId } });
    if (!post) {
      return sendResponse(
        onError(404, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    const likes = await likeModel.findMany({ where: { postId: postId } });
    if (!likes.length) {
      return sendResponse(
        onError(404, messageResponse.LIKE_NOT_FOUND),
        response
      );
    }
    await memcache.setCacheData(postId, likes, cachedKey.LIKE);
    return sendResponse(onSuccess(200, "Likes", likes), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

const createLike = async (request, response) => {
  try {
    const { postId, userId } = request.body;
    const post = await postModel.findOne({ where: { id: postId } });
    if (!post) {
      return sendResponse(
        onError(404, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    const user = await userModel.findOne({ where: { id: userId } });
    if (!user) {
      return sendResponse(
        onError(404, messageResponse.USER_NOT_EXIST),
        response
      );
    }
    const newLike = await likeModel.insert({ postId, userId });
    return sendResponse(
      onSuccess(201, messageResponse.LIKE_CREATED_SUCCESS, newLike),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

const deleteLikes = async (request, response) => {
  try {
    const { postId } = request.params;
    const post = await postModel.findOne({ where: { id: postId } });
    if (!post) {
      return sendResponse(
        onError(404, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    const deletedLikes = await likeModel.removeMany({
      where: { postId: request.params.postId },
    });
    return sendResponse(
      onSuccess(200, messageResponse.LIKE_DELETED_SUCCESS),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

const deleteOneLike = async (request, response) => {
  try {
    const { id } = request.params;
    const like = await likeModel.findOne({ where: { id } });
    if (!like) {
      return sendResponse(
        onError(404, messageResponse.LIKE_NOT_FOUND),
        response
      );
    }
    const deletedLike = await likeModel.remove({
      where: { id: request.params.id },
    });
    return sendResponse(
      onSuccess(200, messageResponse.LIKE_DELETED_SUCCESS),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

export default { getLikes, createLike, deleteLikes, deleteOneLike };
