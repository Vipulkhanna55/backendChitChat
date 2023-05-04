import express from "express";
import bodyParser from "body-parser";
import config from "../../config/config.js";
import database from "../core/database/database.js";
import authorized from "../core/routes/authorized";
import unauthorized from "../core/routes/unauthorized";
import cors from "cors";
import middleware from "../core/middleware";
import { logger } from "../core/helper";
import connectSocket from "../core/helper/socket/chat.js";
import morgan from 'morgan';

const app = express();
const server = connectSocket(app);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

database.sync({ alter: true });

unauthorized(app);
middleware(app);
authorized(app);

server.listen(config.PORT, () => {
  logger.info(`listening on port ${config.PORT}`);
});
