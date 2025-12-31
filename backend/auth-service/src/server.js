require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");


const authRouter = require("./routes/auth");

async function start() {
  if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI in .env");
  if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET in .env");

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Auth DB connected");

  const app = express();
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
  
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ ok: true, service: "auth" }));
  app.use("/auth", authRouter);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Auth service running on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error("Auth start failed:", err);
  process.exit(1);
});
