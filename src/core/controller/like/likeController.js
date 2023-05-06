import { likeModel } from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";
import { postModel, userModel } from "../../models";

const getLikes = async (request, response) => {
  try {
    const { postId } = request.params;
    const post = await postModel.findOne({where: {id: postId}});
    if(!post){
      return sendResponse(onError(404, "Post does not exist"), response);
    }
    const likes = await likeModel.findMany({ where: { postId: postId } });
    if(!likes.length){
      return sendResponse(onError(404, "This post is not liked"), response);
    }
    return sendResponse(onSuccess(200, "Likes", likes), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
  }
};

const createLike = async (request, response) => {
  try {
    const { postId, userId } = request.body;
    const post = await postModel.findOne({where: {id: postId}});
    if(!post){
      return sendResponse(onError(404, "Post does not exist"), response);
    }
    const user = await userModel.findOne({where: {id: userId}});
    if(!user){
      return sendResponse(onError(404, "User does not exist"), response);
    }
    const newLike = await likeModel.insert({ postId, userId });
    return sendResponse(onSuccess(201, "post liked", newLike), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
  }
};

const deleteLikes = async (request, response) => {
  try {
    const {postId} = request.params;
    const post = await postModel.findOne({where: {id: postId}});
    if(!post){
      return sendResponse(onError(404, "Post does not exist"), response);
    }
    const deletedLikes = await likeModel.removeMany({
      where: { postId: request.params.postId },
    });
    return sendResponse(
      onSuccess(200, "likes deleted successfully"),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
  }
};

const deleteOneLike = async (request, response) => {
  try {
    const {id} = request.params;
    const like = await likeModel.findOne({where: {id}});
    if(!like){
      return sendResponse(onError(404, "Like does not exist"), response);
    }
    const deletedLike = await likeModel.remove({
      where: { id: request.params.id },
    });
    return sendResponse(onSuccess(200, "like deleted successfully"), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
  }
};

export default { getLikes, createLike, deleteLikes, deleteOneLike };
