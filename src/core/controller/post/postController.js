import { postModel } from "../../core";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";

const savePost = async (request, response) => {
  try {
    const { body, userId, attachment } = request.body;
    const userExist = await postModel.findOneUser(userId);
    if (!userExist) {
      return sendResponse(onError(500, messageResponse.INVALID_USER), response);
    }
    const postData = await postModel.createPost({ body, attachment, userId });
    return sendResponse(
      onSuccess(201, messageResponse.POST_CREATED_SUCCESS, postData),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const getPost = async (request, response) => {
  try {
    const { id } = request.query;
    const data = await postModel.isPostExist(id);
    if (!data) {
      return sendResponse(
        onError(500, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    let postData = await postModel.getPostComments(id);
    if (!postData.length) {
      postData = await postModel.findOnePost(id);
    }

    return sendResponse(
      onSuccess(200, messageResponse.POST_FOUND_SUCCESS, postData),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const getAllPost = async (request, response) => {
  try {
    const { userId } = request.query;
    const data = await postModel.getAllPost(userId);
    if (!data) {
      return sendResponse(
        onError(500, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    let commentedPostData = await postModel.getAllPosts(data);
    return sendResponse(
      onSuccess(200, messageResponse.POST_FOUND_SUCCESS, commentedPostData),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const updatePost = async (request, response) => {
  try {
    const { id } = request.params;
    const { body, attachment } = request.body;
    const data = await postModel.updatePost(id, body, attachment);
    if (!data) {
      return sendResponse(
        onError(500, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    return sendResponse(
      onSuccess(200, messageResponse.POST_UPDATED_SUCCESS, data),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

const deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    const getPostData = await postModel.isPostExist(id);
    if (!data) {
      return sendResponse(
        onError(500, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    const deletedCommentData = await postModel.deletePostComments(id);
    const deletedPostData = await postModel.deletePost(id);
    return sendResponse(
      onSuccess(200, messageResponse.POST_DELETED_SUCCESS, deletedPostData),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

export default { savePost, getPost, getAllPost, updatePost, deletePost };
