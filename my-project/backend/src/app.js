import  express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";

import userRoutes from "./routes/user.routes.js";

import adminRoutes from "./routes/admin.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

dotenv.config()
export const app=express()

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

const PORT = process.env.PORT;

// using routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/admin",adminRoutes)

app.get("/", (req, res) => {
    res.send("Working");
  });
  

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port: http://localhost:${PORT}`);
    connectDB();
});

// Using Middleware
app.use(errorMiddleware);
