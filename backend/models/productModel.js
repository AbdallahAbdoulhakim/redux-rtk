import mongoose, { Schema } from "mongoose";

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
      default: "",
    },
    rate: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Product", productSchema);
