import categoryModel from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";
import { verifyBsonId, verifyParams } from "../utils/verify.js";

export const createCategory = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyParams(res, req.body, ["title"]);

    const newCategory = await categoryModel.create({ ...req.body });

    res.status(201).json({
      success: true,
      data: { id: newCategory._id, title: newCategory.title },
      message: "Category created successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const getCategory = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyBsonId(res, req.params);
    const { id } = req.params;

    const foundCategory = await categoryModel.findById(id);

    if (!foundCategory) {
      res.status(404);
      throw new Error("Category Not Found!");
    }

    res.status(200).json({
      success: true,
      data: {
        id: foundCategory._id,
        title: foundCategory.title,
      },
      message: "Category retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const updateCategory = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyBsonId(res, req.params);
    const { id } = req.params;

    verifyParams(res, req.body, ["title"]);

    const foundCategory = await categoryModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!foundCategory) {
      res.status(404);
      throw new Error("Category Not Found!");
    }

    res.status(200).json({
      success: true,
      data: {
        id: foundCategory._id,
        title: foundCategory.title,
      },
      message: "Category updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyBsonId(res, req.params);
    const { id } = req.params;

    const deletedCategory = await categoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      res.status(404);
      throw new Error("Category Not Found!");
    }

    res.status(200).json({
      success: true,
      data: {
        id: deletedCategory._id,
        title: deletedCategory.title,
      },
      message: "Category deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const getCategories = expressAsyncHandler(async (_, res, next) => {
  try {
    const categories = await categoryModel.find();

    res.status(200).json({
      success: true,
      data: categories.map((cat) => ({ id: cat._id, title: cat.title })),
      message: categories.length
        ? "Categories retrieved successfully!"
        : "No categories found!",
    });
  } catch (error) {
    next(error);
  }
});
