import jwt from "jsonwebtoken";
import userModel from "../../models/user";
import { validator } from "../../utils";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";
import config from "../../../../config/config.js";
import bcrypt from "bcryptjs";

export default async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!(validator.validateEmail(email) && password.length)) {
      return sendResponse(
        onError(403, messageResponse.INVALID_INPUT),
        response
      );
    }

    const userExist = (await userModel.findOne({ where: { email } })).toJSON();

    if (userExist) {
      const checker = bcrypt.compareSync(password, userExist["password"]);

      if (checker) {
        const token = jwt.sign({ email, password }, config.SECRET, {
          expiresIn: config.JWT_EXPIRY,
        });

        return sendResponse(
          onSuccess(200, messageResponse.LOGIN_SUCCESSFULLY, token),

          response
        );
      } else {
        return sendResponse(
          onError(401, messageResponse.INVALID_PASSWORD),
          response
        );
      }
    } else {
      return sendResponse(
        onError(404, messageResponse.USER_NOT_EXIST),
        response
      );
    }
  } catch (error) {
    globalCatch(request, error);

    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};
