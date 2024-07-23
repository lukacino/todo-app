const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  task: String,
  status: String,
  deadLine: { type: Date, default: Date.now() },
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
