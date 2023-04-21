//Models
import userModel from "../../models/user";

//Helpers
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
  validator,
  jwt
} from "../../helper";

import bcrypt from "bcryptjs";

const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!validator.isLoginRequestValid(email, password)) {
      return sendResponse(
        onError(403, messageResponse.INVALID_INPUT),
        response
      );
    }
    const userExist = (await userModel.findOne({ where: { email } })).toJSON();
    if (userExist) {
      const checker = bcrypt.compareSync(password, userExist["password"]);
      if (checker) {
        const token = jwt.createToken(email, password);
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
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

export default loginController;
