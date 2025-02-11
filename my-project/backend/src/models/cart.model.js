import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique ID for this pizza
      items: [
        {
          category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
          ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true }]
        }
      ],
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  
  totalPrice: { type: Number, required: true, default: 0 }
});


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
