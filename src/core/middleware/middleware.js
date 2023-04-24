import jwt from '../helper/jwt.js';

const verifyJWT = (app) => {
    app.use((request, response, next) => {jwt.jwtVerify(request, response, next)});
    return app;
}

export default verifyJWT;