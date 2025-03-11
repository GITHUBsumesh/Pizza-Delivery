import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.middleware.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import crypto from "crypto";
import {sendEmail} from "../utils/email.js";

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ role, email }).select("+password");
    if (!user)
      return next(new ErrorHandler("Invalid Username Or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Username Or Password", 400));
    if (!user.isVerified)
      return next(new ErrorHandler("Please verify your email to login", 401));

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

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const verificationToken = crypto.randomBytes(20).toString("hex");

    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      isVerified: false, // Explicitly set as unverified
      emailVerificationToken: verificationToken,
      emailVerificationExpires: Date.now() + 3600000,
    });

    if (role === "user") {
      const cart = await Cart.create({ user: user._id, items: [], totalPrice: 0 });
      user.cart = cart._id;
      await user.save();
    }

    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
    await sendEmail({
      email: user.email,
      subject: "Email Verification",
      message: `Verify your email by clicking: ${verificationUrl}`,
    });

    // Remove sendCookie and return verification response
    res.status(201).json({
      success: true,
      message: "Verification email sent. Please check your email.",
    });
  } catch (err) {
    next(err);
  }
};
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    
    // Add debugging logs
    console.log('Verification token received:', token);
    
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log('Invalid token or expired token');
      return next(new ErrorHandler("Invalid or expired verification link", 400));
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    console.log('User verified successfully:', user.email);
    sendCookie(user, res, `Okairi ${user.firstName}`);
    // Return both role and email
    // res.status(200).json({
    //   success: true,
    //   role: user.role,
    //   email: user.email
    // });
  } catch (err) {
    console.error('Verification error:', err);
    next(err);
  }
};
export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("User not found", 404));
    if (user.isVerified)
      return next(new ErrorHandler("Email already verified", 400));

    const verificationToken = crypto.randomBytes(20).toString("hex");
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
    await sendEmail({
      email: user.email,
      subject: "Resend Email Verification",
      message: `Verify your email by clicking: ${verificationUrl}`,
    });

    res.status(200).json({
      success: true,
      message: "Verification email resent",
    });
  } catch (err) {
    next(err);
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User not found", 404));

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Use frontend URL instead of backend URL
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message: `Reset your password here: ${resetUrl}`,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return next(new ErrorHandler("Invalid or expired token", 400));

    user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Send confirmation email
    await sendEmail({
      email: user.email,
      subject: "Password Changed",
      message: "Your password has been successfully changed",
    });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
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
    let uploadResponse = null;
    if (profilePic) {
      uploadResponse = await cloudinary.uploader.upload(profilePic);
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        profilePic: uploadResponse.secure_url,
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
