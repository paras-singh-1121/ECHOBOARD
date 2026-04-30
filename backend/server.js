import 'dotenv/config'; // Modern shortcut for dotenv.config()
import express from 'express';
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import aiRoutes from './routes/ai.routes.js';

// 1. Route Registration
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

// 2. The Async Wrapper (Safest for DB connection)
const startEchoBoard = async () => {
  try {
    // Log this to your console to debug once and for all
    console.log("🔍 Checking MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "NOT FOUND");

    await connectDB();
    
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 EchoBoard running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup Error:", error.message);
    process.exit(1);
  }
};

startEchoBoard();