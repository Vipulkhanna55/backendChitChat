import userRoute from './user.js';

export default (app) => {
    app.use('/', userRoute);
    return app;
}