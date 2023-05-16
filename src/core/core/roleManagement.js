import jwtDecode from "jwt-decode";
import { userModel } from "../models";
import { onError, onSuccess, sendResponse } from "../helper";
const isAdmin = (func) => {
  return async (request, response) => {
    const token = request.headers["authorization"].split(" ")[1];
    var decoded = jwtDecode(token);
    const userIsAdmin = (
      await userModel.findOne({ where: { email: decoded.email } })
    ).isAdmin;
    if (!userIsAdmin) {
      sendResponse(onError(401,"Unauthorized to delete"),response);
    }
    return func(request, response);
  };
};
export default isAdmin;
