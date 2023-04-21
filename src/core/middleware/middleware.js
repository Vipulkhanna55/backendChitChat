import jwt from "jsonwebtoken";
import { onError, sendResponse } from "../helper/responses.js";
import config from "../../../config/config.js";
import { globalCatch } from "../helper/globalCatch.js";
import { messageResponse } from "../helper";
const middleware ={
  jwtVerify: async (request, response, next) => {
    try {
      const token = request.headers["token"];
      if (!token) {
        return sendResponse(
          onError(403, messageResponse.TOKEN_ERROR),
          response
        );
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
      globalCatch(request,error);
      return sendResponse(onError(500, messageResponse.ERROR), response);
    }
  },
};
export default middleware;
