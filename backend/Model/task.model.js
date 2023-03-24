const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  Task: String,
  Sprint: String,
  Date: Date,
  TaskType: String,
  UserId: String,
  TaskStatus: String,
});

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = { TaskModel };
