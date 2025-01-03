import express from "express";
import dotenv from "dotenv";

import cors from "cors";

import dbConnect from "./config/dbConnect.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();
const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;

dbConnect();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API!",
  });
});

app.use("/categories", categoryRouter);
app.use("/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, SERVER_URL, () => {
  console.log(`Server is up at ${SERVER_URL} and listening to PORT ${PORT}...`);
});
