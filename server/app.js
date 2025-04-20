const express = require("express");
const app = express();
let tasks = [];

app.use(express.json()); //Middleware

app.get("/", (req, res) => {
  res.send("TASK MANAGER");
});

app.get("/about", (req, res) => {
  res.send(
    "This Task Manager is differnt from other because it uses the user authentication"
  );
});
let id = 1;
app.post("/tasks", (req, res) => {
  const { taskTitle } = req.body;
  const newTask = {
    Uniqueid: id++,
    title: taskTitle,
    status: false,
  };
  tasks.push(newTask);
  console.log(tasks);
  res.send(`Task added : ${taskTitle}`);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});
//Server live on 5000
app.listen(5000, () => {
  console.log("Server is Live on PORT 5000");
});
