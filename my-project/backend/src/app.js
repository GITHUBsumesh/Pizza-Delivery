import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

dotenv.config();
export const app = express();
app.set("trust proxy", 1); // for render proxy support
// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS setup with dynamic allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL, // http://localhost:3000
  process.env.PROD_URL, // https://pizza-deliverysumesh.vercel.app
].filter(Boolean);
console.log("Allowed Origins:", allowedOrigins);
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Handle preflight requests globally
// app.options("*", cors());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Working");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});

// Error middleware (after routes)
app.use(errorMiddleware);
