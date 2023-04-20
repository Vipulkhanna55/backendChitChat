import jwt from "jsonwebtoken";
import userModel from "../../models/user";

import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";

import config from "../../../../config/config.js";

import validator from "validator";

import bcrypt from "bcryptjs";

export default async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(validator.isEmail(email) && password.length)) {
      return sendResponse(onError(403, messageResponse.INVALID_INPUT), res);
    }

    const userExist = (await userModel.findOne({ where: { email } })).toJSON();
    
    if (userExist) {
      const checker =  bcrypt.compareSync( password,userExist["password"]);

      if (checker) {
        var token = jwt.sign({ email, password }, config.SECRET, {
          expiresIn: 86400,
        });

        return sendResponse(
          onSuccess(200, messageResponse.LOGIN_SUCCESSFULLY, token),

          res
        );
      } else {
        return sendResponse(
          onError(401, messageResponse.INVALID_PASSWORD),

          res
        );
      }
    } else {
      return sendResponse(onError(404, messageResponse.USER_NOT_EXIST), res);
    }
  } catch (error) {
    globalCatch(req, error);

    return sendResponse(onError(500, messageResponse.Error), res);
  }
};
