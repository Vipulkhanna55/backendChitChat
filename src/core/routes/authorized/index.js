import userRoute from "./user.js";
import likeRoute from "./like.js";

export default (app) => {
  app.use("/v1", userRoute);
  app.use('/v1/like', likeRoute);
  return app;
};
