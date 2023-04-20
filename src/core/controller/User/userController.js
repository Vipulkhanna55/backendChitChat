import bcrypt from "bcryptjs";
import { userModel } from "../../models";
import validator from "validator";

import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse
} from "../../helper";

const createUser = async (request, response) => {
  try {
    const { firstName, lastName, gender, email, password } = request.body;
    if (!(validator.isEmail(email) && validator.isStrongPassword(password) && isLocale(firstName) && isLocale(firstName))) {
      return sendResponse(onError(403, messageResponse.INVALID_INPUT), res);
    }
    const userExists = await userModel.findOne({ where: { email:email } });
    if (userExists) {
      return sendResponse(onError(409, messageResponse.Email_Exist), response);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPass
    });
   return sendResponse(
      onSuccess(201, messageResponse.CreatedSuccessFully, newUser),response
   )
  } catch (error) {
    globalCatch(request,error)
    return sendResponse(onError(500, messageResponse.Error), response);

  }
};

const updateUser = async (request, response) => {
  const {firstName, lastName, email, password} = request.body;
  try {
    const user = await userModel.findByPk(request.params.id);
    if (!user) {
      return response.status(404).send('User not found');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    await userModel.update({ firstName, lastName, email, password: hashedPass }, { where: { id: request.params.id }});
    return response.status(200).send('User updated successfully');
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

const deleteUser = async (request, response) => {
  try {
    userModel.destroy({ where: { id: request.params.id } })
      .then(() => {
        response.send("deleted successfully");
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  } catch (error) {
    console.error(error);
    response.status(500).send("Error in deleting user");
  }
}

const getUsers = async (request, response) => {
  try {
    const users = await userModel.findAll();
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

export default { createUser, deleteUser, updateUser, getUsers };
