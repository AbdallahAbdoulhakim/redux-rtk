import categoryModel from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";
import { verifyParams } from "../utils/verifyParams.js";

export const createCategory = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyParams(res, req.body, ["title"]);

    const newCategory = await categoryModel.create({ ...req.body });

    res.status(200).json({
      success: true,
      data: { id: newCategory._id, title: newCategory.title },
      message: "Category created successfully!",
    });
  } catch (error) {
    next(error);
  }
});
