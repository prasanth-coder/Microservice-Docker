const express = require("express");
const { z } = require("zod");
const Todo = require("../models/Todo");

const router = express.Router();

const createSchema = z.object({
  title: z.string().min(1).max(200)
});

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  completed: z.boolean().optional()
}).refine(obj => Object.keys(obj).length > 0, {
  message: "Provide at least one field to update"
});

// GET /todos
router.get("/", async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ data: todos });
});

// POST /todos
router.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "Invalid input", details: parsed.error.issues } });
  }

  const todo = await Todo.create({ userId: req.user.id, title: parsed.data.title });
  res.status(201).json({ data: todo });
});

// PATCH /todos/:id
router.patch("/:id", async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "Invalid input", details: parsed.error.issues } });
  }

  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: parsed.data },
    { new: true, runValidators: true }
  );

  if (!todo) return res.status(404).json({ error: { message: "Todo not found" } });
  res.json({ data: todo });
});

// DELETE /todos/:id
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!todo) return res.status(404).json({ error: { message: "Todo not found" } });
  res.status(204).send();
});

module.exports = router;
