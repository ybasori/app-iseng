import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
// import routes from "./routes";
// import { expandRouter } from "./helper";
import dotenv from "dotenv";
// import fs from 'fs';
import https from 'https';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(express.static("public"));
// app.use("/bulma", express.static("node_modules/bulma/css"));
// app.use("/fa", express.static("node_modules/@fortawesome/fontawesome-free"));
// app.use("/api", (req, _res, next) => {
//   const coloredMethod = `\x1b[32m[${req.method}]\x1b[0m`;
//   const queryStr = Object.entries(req.query)
//     .map(([key, value]) => {
//       if (Array.isArray(value)) {
//         return value
//           .map((v) => `${key}=${encodeURIComponent(v.toString())}`)
//           .join("&");
//       } else {
//         return `${key}=${encodeURIComponent(value?.toString() ?? "")}`;
//       }
//     })
//     .join("&");

//   const timestamp = new Date().toISOString();
//   console.log(
//     `[${timestamp}]${coloredMethod} ${req.path}${
//       queryStr ? "?" + queryStr : ""
//     }`
//   );
//   console.log(``);
//   next();
// });



// expandRouter(routes).forEach((item) =>
//   item.controller && item.method
//     ? app[item.method](
//         item.path,
//         item.middleware ? item.middleware : [],
//         item.controller
//       )
//     : null
// );

// Root route to avoid Railway 502
app.get('/', (_req: Request, res: Response) => {
  res.send('🚀 Hello from Express + TypeScript on Railway!');
});

// Sample API route
app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from API!' });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).send('Internal Server Error');
});


// if(process.env.NODE_ENV !== "production"){

// const key = fs.readFileSync('./ssl/key.pem');
// const cert = fs.readFileSync('./ssl/cert.pem');

// https.createServer({ key, cert }, app).listen(process.env.PORT, () => {
//   console.log(`server running on port ${process.env.PORT}`);
// });

// }
// else{
  
https.createServer(app).listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
// }