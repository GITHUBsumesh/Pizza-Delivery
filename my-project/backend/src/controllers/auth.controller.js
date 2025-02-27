import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.middleware.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ role, email }).select("+password");
    if (!user)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    sendCookie(user, res, `Okairi ${user.firstName}`);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You Are Not Logged In",
      });
    }
    return res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "lax",
        secure: false,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
        user: req.user,
      });
  } catch (err) {
    next(err);
  }
};
export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exists", 400));
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    if (role == "user") {
      // Create an empty cart for the user
      const cart = await Cart.create({
        user: user._id,
        items: [],
        totalPrice: 0,
      });

      // Link cart to user
      user.cart = cart._id;
      await user.save();
    }

    sendCookie(user, res, `Yokoso ${user.firstName}`, 201);
  } catch (err) {
    next(err);
  }
};
export const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { profilePic, firstName, lastName, address, phoneNumber } = req.body;
    // if (!profilePic)
    //   return next(new ErrorHandler("Please upload a profile picture", 400));
    let uploadResponse=null
    if(profilePic) {
      uploadResponse = await cloudinary.uploader.upload(profilePic);
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        profilePic: uploadResponse.secure_url ,
        firstName,
        lastName,
        address,
        phoneNumber,
      },
      { new: true }
    );
    if (!user)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};
