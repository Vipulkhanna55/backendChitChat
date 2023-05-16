import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import {
  userModel,
  postModel,
  commentModel,
  likeModel,
  relationshipModel,
} from "../../models";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
  validator,
  sendMail,
  successSignUpText,
  htmlBody,
  memcache,
} from "../../helper";

const createUser = async (request, response) => {
  try {
    const { firstName, lastName, gender, email, password, profilePicture } =
      request.body;
    if (!validator.isSignupRequestValid(firstName, lastName, email, password)) {
      return sendResponse(
        onError(403, messageResponse.INVALID_INPUT),
        response
      );
    }
    const userExists = await userModel.findOne({ where: { email: email } });
    if (userExists) {
      return sendResponse(onError(409, messageResponse.EMAIL_EXIST), response);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
      profilePicture,
    });
    sendMail(
      messageResponse.MAIL_SUBJECT,
      successSignUpText(firstName + " " + lastName),
      htmlBody("signUpSuccess"),
      email
    );
    return sendResponse(
      onSuccess(201, messageResponse.CREATED_SUCCESS, newUser),
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

const updateUser = async (request, response) => {
  try {
    const { firstName, lastName, email, password, profilePicture } =
      request.body;
    const user = await userModel.findByPk(request.params.id);
    if (!user) {
      return sendResponse(
        onError(404, messageResponse.USER_NOT_EXIST),
        response
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.update(
      { firstName, lastName, email, password: hashedPassword, profilePicture },
      { where: { id: request.params.id } }
    );
    return sendResponse(
      onSuccess(200, messageResponse.UPDATED_SUCCESS, user),
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

const deleteUser = async (request, response) => {
  try {
    const userExists = await userModel.findOne({
      where: { id: request.params.id },
    });
    if (!userExists) {
      return sendResponse(
        onError(404, messageResponse.USER_NOT_EXIST),
        response
      );
    }
    const deleteLikes = await likeModel.destroy({
      where: { userId: request.params.id },
    });
    const deletedComments = await commentModel.destroy({
      where: { userId: request.params.id },
    });
    const deletePosts = await postModel.destroy({
      where: { userId: request.params.id },
    });
    const deleteRelationships = await relationshipModel.destroy({
      where: {
        [Op.or]: [
          { followedUserId: request.params.id },
          { followerUserId: request.params.id },
        ],
      },
    });
    const deletedUser = await userModel.destroy({
      where: { id: request.params.id },
    });
    return sendResponse(
      onSuccess(200, messageResponse.DELETED_SUCCESS, userExists),
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

const getUser = async (request, response) => {
  try {
    const cachedData = memcache.verifyCache(request.params.id, "user");
    if (cachedData) {
      return sendResponse(onSuccess(200, "User details", cachedData), response);
    }
    const user = await userModel.findByPk(request.params.id);
    if (!user) {
      return sendResponse(
        onError(404, messageResponse.USER_NOT_EXIST),
        response
      );
    }
    await memcache.setCacheData(request.params.id, user, "user");
    return sendResponse(onSuccess(200, "User details", user), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

const getUsers = async (request, response) => {
  try {
    const cachedData = memcache.verifyCache("allUsers", "user");
    if (cachedData) {
      return sendResponse(onSuccess(200, "User List", cachedData), response);
    }
    const users = await userModel.findAll();
    await memcache.setCacheData("allUsers", users, "user");
    return sendResponse(onSuccess(200, "User List", users), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

export default {
  createUser,
  deleteUser,
  updateUser,
  getUsers,
  getUser,
};
