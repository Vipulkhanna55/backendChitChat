import comment from "../../core/comment.js";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";

const createComment = async (request, response) => {
  try {
    const { body, userId, postId } = request.body;
    const newComment = await comment.create({ body, userId, postId });
    console.log(newComment);
    return sendResponse(
      onSuccess(201, "comment created", newComment),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const getComments = async (request, response) => {
  try {
    const comments = await comment.findMany(request.params.postId);
    return sendResponse(onSuccess(200, "Comments List", comments), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const getOneComment = async (request, response) => {
  try {
    const foundComment = await comment.findOne(request.params.id);
    return sendResponse(
      onSuccess(200, "Found comment", foundComment),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const updateComment = async (request, response) => {
  try {
    const updatedComment = await comment.update(request.params.id);
    return sendResponse(
      onSuccess(200, "Comment updated", updatedComment),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const deleteComments = async (request, response) => {
  try {
    const deletedComments = await comment.removeMany(request.params.postId);
    return sendResponse(
      onSuccess(200, "Comments deleted", deletedComments),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const deleteOneComment = async (request, response) => {
  try {
    const deletedComment = await comment.remove(request.params.id);
    return sendResponse(
      onSuccess(200, "Comment deleted", deletedComment),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

export default {
  createComment,
  getComments,
  getOneComment,
  updateComment,
  deleteComments,
  deleteOneComment,
};
