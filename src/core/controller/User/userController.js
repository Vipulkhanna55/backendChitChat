import bcrypt from "bcryptjs";
import { userModel } from "../../models";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
  validator
} from "../../helper";

const createUser = async (request, response) => {
  try {
    const { firstName, lastName, gender, email, password, profilePic } = request.body;
    if (!validator.isSignupRequestValid(firstName, lastName, email, password)) {
      return sendResponse(onError(403, messageResponse.INVALID_INPUT), response);
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
      profilePic
    });
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
    const { firstName, lastName, email, password, profilePic } = request.body;
    const user = await userModel.findByPk(request.params.id);
    if (!user) {
      return response.status(404).send("User not found");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.update(
      { firstName, lastName, email, password: hashedPassword, profilePic },
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
    const deletedUser = await userModel.destroy({
      where: { id: request.params.id },
    });
    return sendResponse(onSuccess(200, "User deleted", deletedUser), response);
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
    const users = await userModel.findAll();
    return sendResponse(onSuccess(200, "User List", users), response);
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

export default { createUser, deleteUser, updateUser, getUsers };
