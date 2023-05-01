import {commentModel} from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";
import {userModel} from "../../models";

const createComment = async (request, response) => {
  try {
    const { body, userId, postId } = request.body;
    const newComment = await commentModel.insert({ body, userId, postId });
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
    const {postId} = request.params;
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
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const getOneComment = async (request, response) => {
  try {
    const foundComment = await commentModel.findOne({where: { id: request.params.id } });
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
    const {body} = request.body;
    const updatedComment = await commentModel.modify(body, request.params.id);
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
    const deletedComments = await commentModel.removeMany({ where: { postId: request.params.postId } });
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
    const deletedComment = await commentModel.remove({ where: { id: request.params.id } });
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
