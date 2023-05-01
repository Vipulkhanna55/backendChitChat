import jwtDecode from "jwt-decode";
import { userModel } from "../models";
const isAdmin=(func)=>{
    return async (request,response)=>{
        const token=request.headers['token'];
        var decoded = jwtDecode(token);
        const userIsAdmin=(await userModel.findOne({where:{email:decoded.email}})).isAdmin;
        if(userIsAdmin){
            console.log("Allowed");
        }
        else{
            console.log("Not allowed to delete");
            return response.status(409).send("Many many returns of the day")
        
        }
        return  func(request,response);

    }

}
export default isAdmin;