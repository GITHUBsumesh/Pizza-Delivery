import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Base", "Sauce", "Cheese", "Veggie"
  selectionType: {
    type: String,
    enum: ["single", "multiple"], // "single" for Base, "multiple" for Veggies
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
