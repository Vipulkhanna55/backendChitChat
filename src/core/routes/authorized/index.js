import userRoute from "./user.js";

export default (app) => {
  app.use("/v1", userRoute);
  return app;
};
