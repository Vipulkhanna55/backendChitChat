import express from 'express'
import config from '../../config/cofig.js'
import bodyParser from 'body-parser';
import unauthorized from '../core/routes/unauthorized';
import authorized from '../core/routes/authorized';
import sequelize from '../core/database/database.js';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
sequelize.sync();
unauthorized(app);
authorized(app);

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "55 Chit Chat User API",
        version: "1.0.0",
        description:
          "This is the user signup API for 55 Chit Chat",
        contact: {
          name: "Sameer",
          email: "sameer.srivastava@fiftyfivetech.io.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./routes/unauthorized/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

app.listen(config.PORT,()=>{console.log(`listening on port ${config.PORT}`)});
