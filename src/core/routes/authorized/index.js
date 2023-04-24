import userRoute from "./user.js";
import postRoute from "./post.js";

export default (app) => {
  app.use("/v1/user", userRoute);
  app.use("/v1/post", postRoute);

  return app;
};
