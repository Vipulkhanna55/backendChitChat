import validator from "validator";
import jwt from "jsonwebtoken";
import config from '../../../config/config.js'
export default {
  // loginValidator(req, res, next) {
  //   const { email, password } = req.body;
  //   if (!(validator.isEmail(email) && validator.isStrongPassword(password))) {
  //     return res
  //       .status(401)
  //       .send(new helper.genResponse(false, "", "unauthorized request"));
  //   }
  //   next();
  // },
  jwtVerify(req, res, next) {
    const token=req.header;
    jwt.verify(token,config.SECRET,(err,data)=>{
      if(err){
        res.status(401).send();

      }else{
        next();
      }
    })

  },
};
