import signupRoute from './signup.js';

export default (app) => {
    app.use('/', signupRoute);
    return app;
}