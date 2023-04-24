import express from "express";
import bodyParser from "body-parser";
import config from "../../config/config.js";
import database from "../core/database/database.js";
import authorized from "../core/routes/authorized";
import unauthorized from "../core/routes/unauthorized";
import cors from "cors";
import jwt from '../core/helper/jwt.js';

const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

database.sync({ alter: true });

unauthorized(app);
app.use((request, response, next) => {jwt.jwtVerify(request, response, next)});
authorized(app);


app.listen(config.PORT,()=>{console.log(`listening on port ${config.PORT}`)});
