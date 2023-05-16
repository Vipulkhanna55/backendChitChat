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
      return sendResponse(onError(404, messageResponse.INVALID_USER), response);
    }
    const postData = await postModel.createPost({ body, attachment, userId });
    return sendResponse(
      onSuccess(201, messageResponse.POST_CREATED_SUCCESS, postData),
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

const getPost = async (request, response) => {
  try {
    const { id } = request.query;
    const data = await postModel.isPostExist(id);
    if (!data) {
      return sendResponse(
        onError(404, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    const comment = await postModel.getPostComments(id);
    const like = await postModel.getPostLikes(id);
    const post = await postModel.findOnePost(id);
    const postData = { ...post.dataValues, comment, like };

    return sendResponse(
      onSuccess(200, messageResponse.POST_FOUND_SUCCESS, postData),
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

const getAllPost = async (request, response) => {
  try {
    const { userId } = request.query;
    const data = await postModel.getAllPost(userId);
    if (data.length === 0) {
      return sendResponse(
        onError(404, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    const userCommentData = await postModel.getAllPostsComments(data);
    const userData = await postModel.getAllPostsLikes(userCommentData);
    return sendResponse(
      onSuccess(200, messageResponse.POST_FOUND_SUCCESS, userData),
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

const updatePost = async (request, response) => {
  try {
    const { id } = request.params;
    const { body, attachment } = request.body;
    const post = await postModel.isPostExist(id);
    if (!post) {
      return sendResponse(
        onError(404, messageResponse.POST_NOT_FOUND),
        response
      );
    }
    const data = await postModel.updatePost(id, body, attachment);
    return sendResponse(
      onSuccess(200, messageResponse.POST_UPDATED_SUCCESS, data),
      response
    );
  } catch (error) {
    console.log(error);
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};
const getFeedPosts = async (request, response) => {
  try {
    const feedPosts = await postModel.findFeed();
    const feedCommentData = await postModel.getAllPostsComments(feedPosts);
    const feedData = await postModel.getAllPostsLikes(feedCommentData);
    return sendResponse(
      onSuccess(200, messageResponse.POST_FOUND_SUCCESS, feedData),
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

const deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    const getPostData = await postModel.isPostExist(id);
    if (!getPostData) {
      return sendResponse(
        onError(404, messageResponse.POST_NOT_FOUND),
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
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

export default {
  savePost,
  getPost,
  getAllPost,
  updatePost,
  deletePost,
  getFeedPosts,
};
