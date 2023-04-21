import signup from "./signup.js";
import login from "./login.js";

export default function (app) {
  app.use("/v1/signup", signup);
  app.use("/v1/login", login);
  return app;
}
