import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address : {type: String, required: true},
    email: { type: String, required: true, unique: true },
    phoneNumber:{type :String,unique:true},
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isVerified: { type: Boolean, default: false },
    profilePic: { type: String, default: "" },
    cart: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Cart" 
    }, // Link each user to a Cart

    emailVerificationToken: String,
    emailVerificationExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
