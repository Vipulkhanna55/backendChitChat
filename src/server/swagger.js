import swaggerJsdoc from "swagger-jsdoc";
import { __dirname } from "../core/routes/swaggerHelper.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "55ChitChat Documentation",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        token: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "token",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:8484",
      },
    ],
  },

  apis: [__dirname + "/unauthorized/*.js", __dirname + "/authorized/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
