import jwt from "jsonwebtoken";
import helper from "../../helper/helper.js";
import globalcatch from "../../helper/globalcatch.js";
import config from "../../../../config/cofig.js";

export default {
  logincontroller: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = User.find({ email }).toJSON();
      if (userExist.length) {
        var token = jwt.sign({ email, password }, config.SECRET, {
          expiresIn: 86400,
        });
        res
          .status(200)
          .send(new helper.genResponse(true, token, "successfully logged in"));
      } else {
        res
          .status(404)
          .send(new helper.genResponse(false, "", "user does not exist"));
      }
    } catch (error) {
      globalcatch.globalcatch(req, error);
      res
        .status(500)
        .send(new helper.genResponse(false, "", "error while fetching data"));
    }
  },
};
