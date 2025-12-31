const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
