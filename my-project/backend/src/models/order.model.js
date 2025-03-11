import mongoose from "mongoose";

const razorpayDetailsSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "captured", "failed"],
      default: "pending",
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
  },
  { _id: false, timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique ID for this pizza
        items: [
          {
            category: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Category",
              required: true,
            },
            ingredients: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ingredient",
                required: true,
              },
            ],
          },
        ],
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ], // Each item is a pizza with multiple ingredients
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: [
        "Order Received",
        "In the Kitchen",
        "Sent to Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Received",
    },
    payment: {
      method: { type: String, enum: ["COD", "RazorPay"], default: "COD" },
      razorPayDetails: {
        type: razorpayDetailsSchema,
        required: function () {
          return this.method === "RazorPay";
        },
      },
    },
    orderedTime: { type: Date, default: Date.now },
    deliveryTime: { type: Date }, // Set when order is dispatched
  },
  { timestamps: true }
);
// Indexes for faster queries
orderSchema.index({ user: 1 });
orderSchema.index({ "payment.razorPayDetails.paymentId": 1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;
