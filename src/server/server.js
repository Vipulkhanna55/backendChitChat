import express from "express";
import bodyParser from "body-parser";
import config from "../../config/config.js";
import database from "../core/database/database.js";
import authorized from "../core/routes/authorized";
import unauthorized from "../core/routes/unauthorized";
import cors from "cors";
import middleware from "../core/middleware";
import connectSocket from "../core/helper/socket/chat.js";
import morgan from 'morgan'
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express";
import { __dirname } from "../core/routes/swaggerHelper.js";

const app = express();
const server = connectSocket(app);
const options={
  definition:{
      openapi:'3.0.0',
      info:{
          title:'55ChitChat Documentation',
          version:'1.0.0'

      },
      servers:[{
          url:'http://localhost:8484'
      }]


  },
  
  apis:[__dirname+'/unauthorized/*.js',__dirname+'/authorized/*.js']
}
const swaggerSpec=swaggerJsdoc(options);
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerSpec,{ explorer: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

database.sync({ alter: true });

unauthorized(app);
middleware(app);
authorized(app);

server.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
