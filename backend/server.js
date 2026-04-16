import 'dotenv/config';
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";


const PORT = process.env.PORT || 5000;

// Connect DB first
await connectDB();

const server = http.createServer(app);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
server.listen(PORT, () => {
  console.log(`🚀 EchoBoard server running on port ${PORT}`);
});