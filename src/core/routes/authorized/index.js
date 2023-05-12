import userRoute from "./user.js";
import likeRoute from "./like.js";
import CommentRoute from "./comment.js";
import postRoute from "./post.js";
import relationshipRoute from "./relationship.js";
import chatRoute from "./chat.js";

export default (app) => {
  app.use("/user", userRoute);
  app.use("/comment", CommentRoute);
  app.use("/post", postRoute);
  app.use("/relationship", relationshipRoute);
  app.use("/like", likeRoute);
  app.use("/chat", chatRoute);
  return app;
};
