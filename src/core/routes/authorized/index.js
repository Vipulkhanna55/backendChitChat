import userRoute from './user.js';

export default (app) => {
    app.use('/v1/user', userRoute);
    return app;
}