import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import config from "../../config/config.js";
import database from "../core/database/database.js";
import authorized from '../core/routes/authorized'
import unauthorized from "../core/routes/unauthorized";
import authVerification from '../core/middleware'

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

database.sync({alter:true});

unauthorized(app);

app.use((request,response,next)=>{authVerification.jwtVerify(request,response,next)});
authorized(app);


app.listen(config.PORT,()=>{console.log(`listening on port ${config.PORT}`)});
