import jwt from '../helper/jwt.js';

const middleware = (app) => {
    app.use((request, response, next) => {jwt.jwtVerify(request, response, next)});
    return app;
}

export default middleware;