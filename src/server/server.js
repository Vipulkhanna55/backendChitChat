import express from 'express'
import config from '../../config/cofig.js'
import routes from '../core/routes/index.js'
const app=express();
routes(app);
app.listen(config.PORT,()=>{console.log(`listening on port ${config.PORT}`)});