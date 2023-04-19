import validator from 'validator';
import helper from '../helper/helper.js'
export default{
    loginValidator(req,res,next){
        const{email,password}=req.body;
        if(!(validator.isEmail(email) && validator.isStrongPassword(password))){
            return res.status(401).send(new helper.genResponse(false,'',"unauthorized request"));
        }
        next();

    }
}