import express from "express";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/auth.middleware.js";
import {
  getInventory,
  getInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  addToInventory,
  getAllOrders,
  getOrder,
  updateOrder,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreAllIngredientsInCategory,
  softDeleteAllIngredientsInCategory,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Inventory Routes
router.get("/inventory", authenticateUser, authenticateAdmin, getInventory);

router
  .route("/inventory/:id")
  .get(authenticateUser, authenticateAdmin, getInventoryItem)
  .put(authenticateUser, authenticateAdmin, updateInventoryItem)
  .delete(authenticateUser, authenticateAdmin, deleteInventoryItem);

router.post(
  "/inventory/category",
  authenticateUser,
  authenticateAdmin,
  createCategory
);

router.post(
  "/inventory/add",
  authenticateUser,
  authenticateAdmin,
  addToInventory
);

router
  .route("/inventory/category/:id")
  .put(authenticateUser, authenticateAdmin, updateCategory)
  .delete(authenticateUser, authenticateAdmin, deleteCategory);

router.delete(
  "/inventory/category/:id/softDelete",
  authenticateUser,
  authenticateAdmin,
  softDeleteAllIngredientsInCategory
);

router.put(
  "/inventory/category/:id/restore",
  authenticateUser,
  authenticateAdmin,
  restoreAllIngredientsInCategory
);

// Order Management
router.get("/orders", authenticateUser, authenticateAdmin, getAllOrders);

router
  .route("/orders/:id")
  .get(authenticateUser, authenticateAdmin, getOrder)
  .put(authenticateUser, authenticateAdmin, updateOrder);

export default router;
