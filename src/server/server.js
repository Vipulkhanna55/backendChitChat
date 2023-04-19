import express from "express";
import config from "../../config/cofig.js";
import bodyParser from "body-parser";
import database from "../core/database/database.js";
// import authorized from '../core/routes/index.js'
import unauthorized from "../core/routes/unauthorized/index.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
unauthorized(app);
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
