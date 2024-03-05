import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import { config } from "./config/config";

import clientRoute from "./routes/client";
import sellerRoute from "./routes/seller";
import productRoute from "./routes/products";
import salesRoute from "./routes/sales";

import { Err } from "./types/ErrorTypes";
import problem from "./errorHandling/problem";

const app = express();

const PORT = config.server.port;
const DB_PORT = config.db.port;

app.use(bodyParser.json());

// Routes
app.use("/client", clientRoute);
app.use("/seller", sellerRoute);
app.use("/product", productRoute);
app.use("/sale", salesRoute);

// Handle non existing routes
app.use((req, _res, next) => next(problem(1002, req)));

// Global Error Handling Middleware

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Err, _req: Request, res: Response, _next: NextFunction) => {
  const { status, body } = err;

  res.setHeader("Content-Type", "application/problem+json");
  res.status(status || 500);
  res.json(body);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Postgres DB listening on port ${DB_PORT}`);
});
