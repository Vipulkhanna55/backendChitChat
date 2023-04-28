import speakeasy from "speakeasy";
import jwt_decode from "jwt-decode";
import { userModel } from "../../models";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";

const validate = async (request, response) => {
  try {
    const { code } = request.body;
    const token = request.headers["token"];
    const decoded = jwt_decode(token);
    const user = await userModel.findOne({ where: { email: decoded.email } });
    const isValid = speakeasy.totp.verify({
      secret: user.secret,
      encoding: "base32",
      token: code,
      window: 1
    });
    if (!isValid) {
      return sendResponse(
        onError(403, messageResponse.INVALID_INPUT),
        response
      );
    }
    return sendResponse(
      onSuccess(200, messageResponse.LOGIN_SUCCESSFULLY, user),
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

export default { validate };
