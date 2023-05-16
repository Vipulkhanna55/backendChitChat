import jwt from "jsonwebtoken";
import config from "../../../config/config.js";
import { onError, sendResponse } from "./responses.js";
import { globalCatch } from "./globalCatch.js";
import messageResponse from "./constants.js";

const createToken = (email, password) => {
  const token = jwt.sign({ email, password }, config.SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
  return token;
};

const jwtVerify = async (request, response, next) => {
  try {
    const token = request.headers["authorization"].split(" ")[1];
    if (!token) {
      return sendResponse(onError(403, messageResponse.TOKEN_ERROR), response);
    } else {
      
      jwt.verify(token, config.SECRET, (error, data) => {
        if (error) {
          return sendResponse(
            onError(500, messageResponse.AUTH_FAIL),
            response
          );
        }
        next();
      });
    }
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(onError(500, messageResponse.ERROR), response);
  }
};

export default { createToken, jwtVerify };
