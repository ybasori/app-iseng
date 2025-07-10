import express from "express";
import cookieParser from 'cookie-parser';
import routes from "./routes";
import {expandRouter} from "./helper";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use("/bulma",express.static('node_modules/bulma/css'))
app.use("/fa",express.static('node_modules/@fortawesome/fontawesome-free'))

expandRouter(routes).forEach((item) =>
    item.controller && item.method
      ? app[item.method](
          item.path,
          item.middleware ? item.middleware : [],
          item.controller
        )
      : null
  );



app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})