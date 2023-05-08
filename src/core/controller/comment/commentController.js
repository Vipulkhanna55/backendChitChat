import { commentModel } from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";
import { userModel, postModel } from "../../models";

const createComment = async (request, response) => {
  try {
    const { body, userId, postId } = request.body;
    if (body === "") {
      return sendResponse(onError(400, messageResponse.COMMENT_CANNOT_BE_EMPTY), response);
    }
    const user = await userModel.findOne({ where: { id: userId } });
    if (!user) {
      return sendResponse(onError(404, messageResponse.USER_NOT_EXIST), response);
    }
    const post = await postModel.findOne({ where: { id: postId } });
    if (!post) {
      return sendResponse(onError(404, messageResponse.POST_NOT_FOUND), response);
    }
    const newComment = await commentModel.insert({ body, userId, postId });
    return sendResponse(
      onSuccess(201, messageResponse.COMMENT_CREATED_SUCCESS, newComment),
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

const getComments = async (request, response) => {
  try {
    const { postId } = request.params;
    const post = await postModel.findOne({ where: { id: postId } });
    if (!post) {
      return sendResponse(onError(404, messageResponse.POST_NOT_FOUND), response);
    }
    const comments = await commentModel.findMany({
      where: { postId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: userModel,
          attributes: ["firstName", "lastName", "profilePicture"],
        },
      ],
    });
    return sendResponse(onSuccess(200, "Comments List", comments), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

const getOneComment = async (request, response) => {
  try {
    const foundComment = await commentModel.findOne({
      where: { id: request.params.id },
    });
    if (!foundComment) {
      return sendResponse(onError(404, messageResponse.COMMENT_NOT_FOUND), response);
    }
    return sendResponse(
      onSuccess(200, "Found comment", foundComment),
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

const updateComment = async (request, response) => {
  try {
    const { body } = request.body;
    const { id } = request.params;
    const comment = await commentModel.findOne({
      where: { id },
    });
    if (!comment) {
      return sendResponse(onError(404, messageResponse.COMMENT_NOT_FOUND), response);
    }
    if (body === "") {
      return sendResponse(onError(400, messageResponse.COMMENT_CANNOT_BE_EMPTY), response);
    }
    const updateComment = await commentModel.modify(body, id);
    const updatedComment = await commentModel.findOne({
      where: { id },
    });
    return sendResponse(
      onSuccess(200, messageResponse.COMMENT_UPDATED_SUCCESS, updatedComment),
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

const deleteComments = async (request, response) => {
  try {
    const post = await postModel.findOne({
      where: { id: request.params.postId },
    });
    if (!post) {
      return sendResponse(onError(404, messageResponse.POST_NOT_FOUND), response);
    }
    const deletedComments = await commentModel.removeMany({
      where: { postId: request.params.postId },
    });
    return sendResponse(
      onSuccess(200, messageResponse.COMMENT_DELETED_SUCCESS),
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

const deleteOneComment = async (request, response) => {
  try {
    const comment = await commentModel.findOne({
      where: { id: request.params.id },
    });
    if (!comment) {
      return sendResponse(onError(404, messageResponse.COMMENT_NOT_FOUND), response);
    }
    const deletedComment = await commentModel.remove({
      where: { id: request.params.id },
    });
    return sendResponse(
      onSuccess(200, messageResponse.COMMENT_DELETED_SUCCESS),
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

export default {
  createComment,
  getComments,
  getOneComment,
  updateComment,
  deleteComments,
  deleteOneComment,
};
