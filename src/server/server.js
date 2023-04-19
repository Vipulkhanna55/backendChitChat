import express from 'express'
import config from '../../config/cofig.js'
import bodyParser from 'body-parser';
import router from '../core/routes/unauthorized/index.js';
import sequelize from '../core/database/database.js';

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
sequelize.sync();
router(app);

app.listen(config.PORT,()=>{console.log(`listening on port ${config.PORT}`)});