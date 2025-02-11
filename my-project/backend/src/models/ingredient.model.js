import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Mozzarella", "Tomato Sauce"
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 , required: true},
  threshold: { type: Number, default: 20 },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export default Ingredient;
