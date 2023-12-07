import express from "express";
import cors from "cors";
import startupRoutes from "./routes/startupRoutes";
import { setupCache } from "axios-cache-interceptor";

const app = express();
const port = 8080;
const corsOptions = { origin: "http://localhost:3000" };
const axios = setupCache(require("axios"));

app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Express + TypeScript Server"));

app.use("/api", startupRoutes);

app.listen(port, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
);
