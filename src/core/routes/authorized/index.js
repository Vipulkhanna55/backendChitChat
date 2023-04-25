import userRoute from "./user.js";
import likeRoute from "./like.js";
import CommentRoute from "./comment.js";
import postRoute from "./post.js";

export default (app) => {
  app.use("/v1/user", userRoute);
  app.use("/v1/comment", CommentRoute);
  app.use("/v1/post", postRoute);
  app.use('/v1/like', likeRoute);
  return app;
};
