import express from "express";
import type { Request, Response } from "express";

interface Task {
  id: number;
  task: string;
  isComplete: boolean;
}

const tasks: Task[] = [];

const server = express();
const port = 4000;

server.use(express.json()); // body parser

//Get (Read)
server.get("/tasks", (req: Request, res: Response) => {
  res.send(tasks);
});

//Post (Creat)
server.post("/tasks", (req: Request, res: Response) => {
  const { task, isComplete } = req.body;
  const maxId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
  const newTask = { id: maxId + 1, task, isComplete };
  tasks.push(newTask);
  res.send(tasks);
});

//Put (Update)
server.put("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { task, isComplete } = req.body;
  const findedTask = tasks.findIndex((task) => String(task.id) === String(id));
  if (findedTask !== -1) {
    tasks[findedTask] = { ...tasks[findedTask], task, isComplete };
    res.send(tasks);
  } else {
    res.status(404).send("not found id");
  }
});

//Delete
server.delete("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const findedTask = tasks.findIndex((task) => String(task.id) === String(id));
  if (findedTask !== -1) {
    tasks.splice(findedTask, 1);
    res.send(tasks);
  } else {
    res.status(404).send("not found id");
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
