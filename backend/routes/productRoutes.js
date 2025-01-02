import express from "express";
import { createProduct } from "../controller/productControl.js";

const router = express.Router();

router.post("/:catId/create", createProduct);

export default router;
