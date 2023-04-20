import express from "express";
import config from "../../config/config.js";
import bodyParser from "body-parser";
import database from "../core/database/database.js";
import authorized from '../core/routes/authorized'
import unauthorized from "../core/routes/unauthorized";
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

database.sync({alter:true});

unauthorized(app);
authorized(app);

app.listen(config.PORT,()=>{console.log(`listening on port ${config.PORT}`)});
