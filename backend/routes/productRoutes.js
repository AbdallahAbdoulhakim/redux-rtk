import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controller/productControl.js";

const router = express.Router();

router.get("/all", getProducts);
router.get("/:id", getProduct);
router.post("/create", createProduct);
router.put("/update/:id/", updateProduct);
router.delete("/delete/:id/", deleteProduct);

export default router;
