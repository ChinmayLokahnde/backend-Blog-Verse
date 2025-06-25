import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authroutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import aiRoutes from "./routes/ai.js";
import upload from "./middleware/uploadMiddleware.js";

dotenv.config();
console.log("JWT_SECRET on server start:", process.env.JWT_SECRET);
connectDB();


const app  = express();

const allowedOrigins = [
  'https://blog-verse-xi.vercel.app', 
  'http://localhost:5173',         
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/auth', authroutes);
app.use('/api/posts', postRoutes);
app.use('/api/ai', aiRoutes);
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));