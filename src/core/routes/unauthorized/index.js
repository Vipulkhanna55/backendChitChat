import login from "./login.js";
import signup from "./signup.js";

export default function (app) {
  app.use("/v1/login", login);
  app.use("/v1/signup", signup);

  return app;
}
