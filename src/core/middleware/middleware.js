import { jwt, messageResponse, sendResponse, onError } from "../helper";
import config from "../../../config/config.js";

const middleware = (app) => {
  app.use((request, response, next) => {
    const token = request.headers["authorization"].split(" ")[1];
    if (!token) {
      return sendResponse(onError(403, messageResponse.TOKEN_ERROR), response);
    } else {
      const verified = jwt.jwtVerify(token, config.SECRET);
      if (verified) {
        next();
      }
    }
  });
  return app;
};

export default middleware;
