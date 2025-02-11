import ErrorHandler from "../middleware/error.middleware.js";
import Ingredient from "../models/ingredient.model.js";
import Cart from "../models/cart.model.js";
import Inventory from "../models/inventory.model.js";
import Order from "../models/order.model.js";
import Category from "../models/category.model.js";

export const getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find({})
      .populate("category", "name selectionType")
      .populate("ingredients", "name image price stock")
      .lean();
    if (!inventory) return next(new ErrorHandler("Cannot Get Inventory"));
    const availableInventory = inventory.filter(
      (item) => item.isDeleted == false
    );
    const filteredInventory = availableInventory.map((category) => ({
      ...category,
      ingredients: category.ingredients.filter((item) => item.stock > 0),
    }));
    res.status(200).json({
      success: true,
      message: "Inventory fetched successfully",
      inventory: filteredInventory,
    });
  } catch (error) {
    next(error);
  }
};
// cart functions
export const addToCart = async (req, res, next) => {
  try {
    const { items, quantity } = req.body;

    if (!items || !items.length) {
      return next(
        new ErrorHandler(
          "At least one category with ingredients is required",
          400
        )
      );
    }

    // Extract all ingredient IDs
    const ingredientIds = items.flatMap((item) => item.ingredients);

    // Fetch ingredient details with categories
    const ingredients = await Ingredient.find({
      _id: { $in: ingredientIds },
    }).populate("category");

    if (ingredients.length !== ingredientIds.length) {
      return next(new ErrorHandler("One or more ingredients are invalid", 400));
    }

    // Validate selection rules based on category
    for (const item of items) {
      const categoryIngredients = ingredients.filter(
        (ing) => ing.category._id.toString() === item.category
      );
      const categorySelectionType =
        categoryIngredients[0]?.category.selectionType; // "single" or "multiple"

      if (categorySelectionType === "single" && item.ingredients.length > 1) {
        return next(
          new ErrorHandler(
            `Only one ingredient allowed for category: ${categoryIngredients[0].category.name}`,
            400
          )
        );
      }
    }

    // Calculate total price
    const totalPrice =
      ingredients.reduce((sum, ing) => sum + ing.price, 0) * quantity;

    // Find or create the user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalPrice: 0 });
    }

    // Check if an item with the same categories & ingredients exists
    const existingItem = cart.items.find(
      (cartItem) =>
        JSON.stringify(
          cartItem.items.map((i) => ({
            category: i.category.toString(),
            ingredients: i.ingredients.map((id) => id.toString()),
          }))
        ) ===
        JSON.stringify(
          items.map((i) => ({
            category: i.category.toString(),
            ingredients: i.ingredients.map((id) => id.toString()),
          }))
        )
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price += totalPrice;
    } else {
      cart.items.push({
        items: items.map(({ category, ingredients }) => ({
          category,
          ingredients,
        })), // ✅ Fixes nesting issue
        quantity,
        price: totalPrice,
      });
    }

    cart.totalPrice += totalPrice;
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Pizza added to cart", cart });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.items.category", "name")
      .populate("items.items.ingredients", "name price");

    if (!cart) {
      return res
        .status(200)
        .json({ success: true, cart: { items: [], totalPrice: 0 } });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params; // Cart item ID
    const { items, quantity } = req.body; // items = [{ category, ingredients }]

    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.items.category", "name")
      .populate("items.items.ingredients", "name price");

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    let cartItem = cart.items.id(id);
    if (!cartItem) {
      return next(new ErrorHandler("Cart item not found", 404));
    }

    if (!items || !items.length) {
      return next(
        new ErrorHandler(
          "At least one category with ingredients is required",
          400
        )
      );
    }

    // Extract ingredient IDs
    const ingredientIds = items.flatMap((item) => item.ingredients);

    // Fetch ingredient details and validate them
    const ingredients = await Ingredient.find({
      _id: { $in: ingredientIds },
    }).populate("category");

    if (ingredients.length !== ingredientIds.length) {
      return next(new ErrorHandler("One or more ingredients are invalid", 400));
    }

    let newTotalPrice = 0;

    for (const item of items) {
      const category = await Category.findById(item.category);
      if (!category) {
        return next(new ErrorHandler("Invalid category", 400));
      }

      if (category.selectionType === "single" && item.ingredients.length > 1) {
        return next(
          new ErrorHandler(
            `Only one ingredient allowed for category: ${category.name}`,
            400
          )
        );
      }

      const categoryPrice = ingredients
        .filter((ing) => item.ingredients.includes(ing._id.toString()))
        .reduce((sum, ing) => sum + ing.price, 0);

      newTotalPrice += categoryPrice;
    }

    // Update cart item
    cartItem.items = items;
    cartItem.quantity = quantity;
    cartItem.price = newTotalPrice * quantity;

    // Recalculate total cart price
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params; // Cart item ID

    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.items.category", "name")
      .populate("items.items.ingredients", "name price");

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === id
    );

    if (itemIndex === -1) {
      return next(new ErrorHandler("Cart item not found", 404));
    }

    let cartItem = cart.items[itemIndex];

    if (cartItem.quantity > 1) {
      // Decrease quantity by 1
      cartItem.quantity -= 1;
      // Adjust price accordingly
      cartItem.price =
        (cartItem.price / (cartItem.quantity + 1)) * cartItem.quantity;
    } else {
      // If quantity is 1, remove the item from cart
      cart.items.splice(itemIndex, 1);
    }

    // Recalculate total cart price
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price, 0);

    // If cart is empty, reset totalPrice to 0
    if (cart.items.length === 0) {
      cart.totalPrice = 0;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// order
export const addOrder = async (req, res, next) => {
  try {
    const { deliveryTime, paymentMethod, razorPayDetails } = req.body; // User can pass delivery time & payment method

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.items.category", "name") // Populate category names
      .populate("items.items.ingredients", "name price"); // Populate ingredient details

    if (!cart || cart.items.length === 0) {
      return next(new ErrorHandler("Your cart is empty", 400));
    }

    const orderItems = cart.items.map((pizza) => ({
      pizzaId: pizza._id, // Unique ID for this pizza
      items: pizza.items.map((item) => ({
        category: {
          _id: item.category._id,
          name: item.category.name,
        },
        ingredients: item.ingredients.map((ing) => ({
          _id: ing._id,
          name: ing.name,
          price: ing.price,
        })),
      })),
      quantity: pizza.quantity,
      price: pizza.price,
    }));
    // Determine payment details
    const payment = {
      method: paymentMethod || "COD", // Default to COD
      razorPayDetails:
        paymentMethod === "RazorPay"
          ? {
              orderId: razorPayDetails?.orderId || null,
              paymentId: razorPayDetails?.paymentId || null,
              signature: razorPayDetails?.signature || null,
              status: "pending",
            }
          : undefined, // RazorPay details only if paymentMethod is RazorPay
    };

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice: cart.totalPrice,
      status: "Order Received",
      payment,
      orderedTime: new Date(),
      deliveryTime: deliveryTime || null, // Set delivery time if provided
    });
    // Clear the cart after placing the order
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMyOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate({
        path: "items.items.category",
        select: "name",
      })
      .populate({
        path: "items.items.ingredients",
        select: "name price",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    if (order.status !== "Order Received") {
      return next(
        new ErrorHandler(
          "Only orders that are 'Order Received' can be canceled",
          400
        )
      );
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order canceled successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
