const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  Task: String,
  Sprint: String,
  Start_Date: Date,
  TaskType: String,
  Due_Date: Date,
  UserId: String,
  TaskStatus: String,
});

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = { TaskModel };
