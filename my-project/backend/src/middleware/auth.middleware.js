import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You need to login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let userQuery = User.findById(decoded._id).select("-password");

    // Populate cart only if the user is not an admin
    if (decoded.role !== "admin") {
      userQuery = userQuery.populate("cart");
    }

    req.user = await userQuery;

    next();
  } catch (error) {
    console.log("Error in isAuthenticated middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authenticateAdmin = (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({ success: false, message: "Forbidden. Admin access only" });

  next();
};
