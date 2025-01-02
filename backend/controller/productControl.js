import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";
import { verifyBsonId, verifyParams } from "../utils/verify.js";

export const createProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    const { catId } = req?.params;
    verifyBsonId(res, catId);

    const foundCategory = await categoryModel.findById(catId);

    if (!foundCategory) {
      res.status(404);
      throw new Error(
        "The category which id is provided in the request parameter, does not exist!"
      );
    }

    verifyParams(
      res,
      req.body,
      ["title", "price", "description"],
      ["rate", "count", "image"]
    );

    const newProduct = await productModel.create({
      ...req.body,
      category: foundCategory,
    });

    res.status(201).json({
      success: true,
      data: {
        id: newProduct._id,
        title: newProduct.title,
        description: newProduct.description,
        category: foundCategory.title,
        price: newProduct.price,
        rating: {
          rate: newProduct.rate,
          count: newProduct.count,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
