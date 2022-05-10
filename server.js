import express, { json } from "express";
import cors from "cors";
import reservation from "./route.js";
import { responseFormat, errorHandler } from "./middleware.js";

const app = express();
const port = 5000;

app.use(json());
app.use(cors());
app.use(errorHandler);

app.use("/api/v1/reservation", reservation, responseFormat);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
