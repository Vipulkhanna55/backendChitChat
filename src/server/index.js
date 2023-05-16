import express from "express";
import bodyParser from "body-parser";
import config from "../../config/config.js";
import database from "../core/database/database.js";
import authorized from "../core/routes/authorized/index.js";
import unauthorized from "../core/routes/unauthorized/index.js";
import cors from "cors";
import middleware from "../core/middleware/index.js";
import connectSocket from "../core/helper/socket/chat.js";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();
const server = connectSocket(app);
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

database.sync({ alter: true });

unauthorized(app);
middleware(app);
authorized(app);

export default server;
