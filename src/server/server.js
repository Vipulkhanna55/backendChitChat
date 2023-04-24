import express from "express";
import bodyParser from "body-parser";
import config from "../../config/config.js";
import database from "../core/database/database.js";
import authorized from "../core/routes/authorized";
import unauthorized from "../core/routes/unauthorized";
import cors from "cors";
import middleware from '../core/middleware';

const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

database.sync({ alter: true });

unauthorized(app);
middleware(app);
authorized(app);


app.listen(config.PORT,()=>{console.log(`listening on port ${config.PORT}`)});
