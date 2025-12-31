require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");



const { authMiddleware } = require("./middleware/auth");
const todosRouter = require("./routes/todos");

async function start() {
  if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI in .env");
  if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET in .env");

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Todo DB connected");

  const app = express();

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
  
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ ok: true, service: "todos" }));

  // Protect everything under /todos
  app.use("/todos", authMiddleware, todosRouter);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Todo service running on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error("Todo start failed:", err);
  process.exit(1);
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTU1NWNiYThjOTJiOGJhZTgwOTk5NmIiLCJpYXQiOjE3NjcyMDI3MTQsImV4cCI6MTc2NzIwNjMxNH0.hdnbcQcpMvdDUrjp6rYLMVyYEKehYxQzDZwfVlxykPQ