import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { expandRouter } from "./helper";
import dotenv from "dotenv";
import fs from 'fs';
import https from 'https';
import http from 'http';

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use("/bulma", express.static("node_modules/bulma/css"));
app.use("/fa", express.static("node_modules/@fortawesome/fontawesome-free"));
app.use("/api", (req, _res, next) => {
  const coloredMethod = `\x1b[32m[${req.method}]\x1b[0m`;
  const queryStr = Object.entries(req.query)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map((v) => `${key}=${encodeURIComponent(v.toString())}`)
          .join("&");
      } else {
        return `${key}=${encodeURIComponent(value?.toString() ?? "")}`;
      }
    })
    .join("&");

  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}]${coloredMethod} ${req.path}${
      queryStr ? "?" + queryStr : ""
    }`
  );
  console.log(``);
  next();
});

expandRouter(routes).forEach((item) =>
  item.controller && item.method
    ? app[item.method](
        item.path,
        item.middleware ? item.middleware : [],
        item.controller
      )
    : null
);

if(process.env.NODE_ENV !== "production"){

const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');

https.createServer({ key, cert }, app).listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

}
else{
  
http.createServer(app).listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
}