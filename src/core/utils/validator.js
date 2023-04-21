import validator from "validator";
export default{
    validateEmail(email){
        return validator.isEmail(email);
    },
    checkName(name){
        return /^[a-z ,.'-]+$/i.test(name)
    }
};