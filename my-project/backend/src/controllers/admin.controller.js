import ErrorHandler from "../middleware/error.middleware.js";
import Inventory from "../models/inventory.model.js";
import Order from "../models/order.model.js";
import Category from "../models/category.model.js";
import Ingredient from "../models/ingredient.model.js";

// Get Full Inventory
export const getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find({})
      .populate("category", "name selectionType")
      .populate({
        path: "ingredients",
        select: "name image price stock category",
        populate: {
          path: "category",
          select: "name", // Ensure this is only 'name' and not 'category.name'
        },
      });
    if (!inventory) return next(new ErrorHandler("Cannot Get Inventory"));
    res.status(200).json({
      success: true,
      message: "Inventory fetched successfully",
      inventory,
    });
  } catch (error) {
    next(error);
  }
};
// Get Inventory Item
export const getInventoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Ingredient.findById(id)
      .populate("category", "name selectionType")
      .lean();

    if (!item) return next(new ErrorHandler("Inventory item not found", 404));

    res.status(200).json({
      success: true,
      message: "Inventory item fetched successfully",
      item,
    });
  } catch (error) {
    next(error);
  }
};
// Update Inventory
export const updateInventoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, stock, price } = req.body;

    const updatedItem = await Ingredient.findByIdAndUpdate(
      id,
      { name, stock, price },
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!updatedItem)
      return next(new ErrorHandler("Inventory item not found", 404));

    res.status(200).json({
      success: true,
      message: "Inventory item updated successfully",
      updatedItem,
    });
  } catch (error) {
    next(error);
  }
};
// Delete Inventory Item
export const deleteInventoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedItem = await Ingredient.findByIdAndDelete(id);

    if (!deletedItem)
      return next(new ErrorHandler("Inventory item not found", 404));

    res.status(200).json({
      success: true,
      message: "Inventory item deleted successfully",
      deletedItem,
    });
  } catch (error) {
    next(error);
  }
};
// Add Item to Inventory
export const addToInventory = async (req, res, next) => {
  try {
    const { categoryName, name, stock, price, image } = req.body;

    // Check if category exists
    const categoryExists = await Category.findOne({ name: categoryName });
    if (!categoryExists) {
      return next(new ErrorHandler("Invalid category.", 400));
    }

    // Check if ingredient already exists in the category
    let ingredient = await Ingredient.findOne({
      name,
      category: categoryExists._id,
    });
    if (ingredient) {
      return next(new ErrorHandler("Ingredient Already Exists.", 400));
    }
    // Create a new ingredient and associate it with the category
    ingredient = await Ingredient.create({
      name,
      price,
      image,
      stock,
      category: categoryExists._id, // ✅ Include category
    });

    // Add the ingredient to the inventory
    const inventoryItem = await Inventory.findOneAndUpdate(
      { category: categoryExists._id },
      { $addToSet: { ingredients: ingredient._id } },
      { new: true, upsert: true, runValidators: true }
    ).populate("category");

    res.status(201).json({
      success: true,
      message: "Item added to inventory",
      inventoryItem,
    });
  } catch (error) {
    next(error);
  }
};

// Create New Category
export const createCategory = async (req, res, next) => {
  try {
    const { name, selectionType } = req.body;
    // Validate input
    if (!name || !selectionType) {
      return next(new ErrorHandler("Name and selectionType are required", 400));
    }
    // Check if category already exists (case insensitive)
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (existingCategory) {
      return next(new ErrorHandler("Category already exists", 400));
    }
    // Create new category
    const newCategory = await Category.create({ name, selectionType });

    // Add the ingredient to the inventory
    const inventoryItem = await Inventory.create({ category: newCategory._id });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    next(error);
  }
};

// Update Category
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, selectionType } = req.body;

    // Check if category exists
    let category = await Category.findById(id);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }
    // Prevent duplicate category names (case insensitive)
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
      _id: { $ne: id }, // Exclude the current category
    });

    if (existingCategory) {
      return next(new ErrorHandler("Category name already exists", 400));
    }
    // Update category
    category.name = name || category.name;
    category.selectionType = selectionType || category.selectionType;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};
// Delete Category
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    // Find all inventory items linked to this category
    const inventoryItems = await Inventory.find({ category: id });

    // Extract ingredient IDs from inventory items
    const ingredientIds = inventoryItems.map((item) => item.ingredients);

    // Remove all ingredients linked to this category
    await Ingredient.deleteMany({ _id: { $in: ingredientIds } });

    // Remove inventory items linked to this category
    await Inventory.deleteMany({ category: id });

    // Delete the category itself
    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message:
        "Category, associated inventory items, and ingredients deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Restore After Soft Delete
export const restoreAllIngredientsInCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if there are soft-deleted ingredients
    const deletedItems = await Inventory.find({
      category: id,
      isDeleted: true,
    });

    if (!deletedItems.length) {
      return next(
        new ErrorHandler("No deleted ingredients found in this category", 404)
      );
    }

    // Restore the soft-deleted ingredients
    await Inventory.updateMany({ category: id }, { isDeleted: false });

    res.status(200).json({
      success: true,
      message: "All ingredients in the category restored successfully",
    });
  } catch (error) {
    next(error);
  }
};
// Soft Delete
export const softDeleteAllIngredientsInCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if ingredients exist in the given category
    const inventoryItems = await Inventory.find({ category: id });

    if (!inventoryItems.length) {
      return next(
        new ErrorHandler("No ingredients found in this category", 404)
      );
    }

    // Update isDeleted to true instead of removing ingredients
    await Inventory.updateMany({ category: id }, { isDeleted: true });

    res.status(200).json({
      success: true,
      message: "All ingredients in the category soft deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
// Get All Orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate({
        path: "items.items.category",
        select: "name",
      })
      .populate({
        path: "items.items.ingredients",
        select: "name price",
      })
      .lean();

    if (!orders || orders.length === 0) {
      return next(new ErrorHandler("No orders found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    next(error);
  }
};
// Get Single Order by ID
export const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user", "name email address")
      .populate({
        path: "items.items.category",
        select: "name",
      })
      .populate({
        path: "items.items.ingredients",
        select: "name price",
      });

    if (!order) return next(new ErrorHandler("Order not found", 404));

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
// Update Order Status
export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, deliveryTime: Date.now() },
      { new: true, runValidators: true }
    )
      .populate("user", "name email")
      .populate({
        path: "items.items.category",
        select: "name",
      })
      .populate({
        path: "items.items.ingredients",
        select: "name price",
      });

    if (!updatedOrder) return next(new ErrorHandler("Order not found", 404));

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
