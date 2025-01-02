import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";
import { verifyBsonId, verifyParams } from "../utils/verify.js";
import { query } from "express";

export const createProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyParams(
      res,
      req.body,
      ["title", "price", "description", "categoryId"],
      ["rate", "count", "image"]
    );

    verifyBsonId(res, { categoryId: req.body.categoryId });

    const foundCategory = await categoryModel.findById(req.body.categoryId);

    if (!foundCategory) {
      res.status(404);
      throw new Error(
        "The category which id is provided in the request parameter, does not exist!"
      );
    }

    const newProduct = await (
      await productModel.create({
        ...req.body,
        category: foundCategory,
      })
    ).populate("category");

    res.status(201).json({
      success: true,
      data: {
        id: newProduct._id,
        title: newProduct.title,
        description: newProduct.description,
        category: {
          id: newProduct.category._id,
          title: newProduct.category.title,
        },
        image: newProduct.image,
        price: newProduct.price,
        rating: {
          rate: newProduct.rate,
          count: newProduct.count,
        },
      },
      message: "Product created successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyBsonId(res, req.params);
    const { id } = req.params;
    verifyParams(
      res,
      req.body,
      [],
      ["title", "price", "description", "categoryId", "image", "rate", "count"]
    );

    let updatedProduct;

    if (req.body?.categoryId) {
      verifyBsonId(res, { categoryId: req.body.categoryId });

      const foundCategory = await categoryModel.findById(req.body.categoryId);

      if (!foundCategory) {
        res.status(404);
        throw new Error(
          "The category which id is provided in the request parameters, does not exist!"
        );
      }

      updatedProduct = await (
        await productModel.findByIdAndUpdate(
          id,
          {
            ...req.body,
            category: foundCategory,
          },
          { new: true }
        )
      )?.populate("category");
    } else {
      updatedProduct = await (
        await productModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
      )?.populate("category");
    }

    if (!updatedProduct) {
      res.status(404);
      throw new Error("Product Not Found!");
    }

    res.status(200).json({
      success: true,
      data: {
        id: updatedProduct._id,
        title: updatedProduct.title,
        description: updatedProduct.description,
        category: {
          id: updatedProduct.category._id,
          title: updatedProduct.category.title,
        },
        image: updatedProduct.image,
        price: updatedProduct.price,
        rating: {
          rate: updatedProduct.rate,
          count: updatedProduct.count,
        },
      },
      message: "Product updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const getProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyBsonId(res, req.params);
    const { id } = req.params;

    const foundProduct = await (
      await productModel.findById(id)
    )?.populate("category");

    if (!foundProduct) {
      res.status(404);
      throw new Error("Product Not Found!");
    }

    res.status(200).json({
      success: true,
      data: {
        id: foundProduct._id,
        title: foundProduct.title,
        description: foundProduct.description,
        category: {
          id: foundProduct.category._id,
          title: foundProduct.category.title,
        },
        image: foundProduct.image,
        price: foundProduct.price,
        rating: {
          rate: foundProduct.rate,
          count: foundProduct.count,
        },
      },
      message: "Product retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    verifyBsonId(res, req.params);
    const { id } = req.params;

    const deletedProduct = await (
      await productModel.findByIdAndDelete(id)
    )?.populate("category");

    if (!deletedProduct) {
      res.status(404);
      throw new Error("Product Not Found!");
    }

    res.status(200).json({
      success: true,
      data: {
        id: deletedProduct._id,
        title: deletedProduct.title,
        description: deletedProduct.description,
        category: {
          id: deletedProduct.category._id,
          title: deletedProduct.category.title,
        },
        image: deletedProduct.image,
        price: deletedProduct.price,
        rating: {
          rate: deletedProduct.rate,
          count: deletedProduct.count,
        },
      },
      message: "Product Deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const getProducts = expressAsyncHandler(async (req, res, next) => {
  const productsLabels = {
    totalDocs: "postCount",
    docs: "products",
    totalPages: "pageCount",
    currentPage: "page",
  };
  try {
    verifyParams(
      res,
      req.query,
      [],
      ["search", "page", "offset", "limit"],
      true
    );

    const queryParams = req.query;

    const query = queryParams?.search
      ? {
          $or: [
            { title: { $regex: queryParams.search, $options: "i" } },
            { description: { $regex: queryParams.search, $options: "i" } },
          ],
        }
      : {};

    const options = {
      limit: queryParams?.limit
        ? queryParams.limit <= 10
          ? queryParams.limit
          : 10
        : 5,
      customLabels: productsLabels,
      sort: { createdAt: -1 },
      populate: "category",
    };

    if (queryParams?.offset) {
      options.offset = queryParams.offset;
    }

    if (queryParams?.page) {
      options.page = queryParams.page;
    }

    const queryProducts = await productModel.paginate(query, options);

    res.status(200).json({
      success: true,
      data: {
        ...queryProducts,
        products: queryProducts.products.map((prod) => ({
          id: prod._id,
          title: prod.title,
          price: prod.price,
          description: prod.description,
          category: {
            id: prod.category._id,
            title: prod.category.title,
          },
          image: prod.image,
          rating: {
            rate: prod.rate,
            count: prod.count,
          },
        })),
      },
      message: "Products retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});
