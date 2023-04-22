import userRoute from "./user.js";
import CommentRoute from "./comment.js";

export default (app) => {
  app.use("/v1/user", userRoute);
  app.use("/v1/comment", CommentRoute);
  return app;
};
