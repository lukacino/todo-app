const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const TaskModel = require("./Tasks");
require("dotenv").config({ path: "../config.env" });

const app = express();
app.use(json());
app.use(cors());

mongoose.connect(process.env.DB_URL).then(() => console.log("Db connected"));

app.post("/api/tasks", (req, res) => {
  TaskModel.create({
    task: req.body.task,
    status: req.body.status,
    deadLine: req.body.date,
  });
});

app.get("/api/tasks", async (req, res) => {
  const getAll = await TaskModel.find();
  res.send(getAll);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const del = await TaskModel.findByIdAndDelete({ _id: taskId });
  res.json(del);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
