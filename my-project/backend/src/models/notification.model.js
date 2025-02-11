import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    ingredientType: {
      type: String,
      enum: ["PizzaBase", "Sauce", "Cheese", "Veggie", "Meat"],
      required: true,
    },
    ingredientId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "ingredientType",
      required: true,
    },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now, immutable: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexing for better query performance
notificationSchema.index({ read: 1, sentAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
