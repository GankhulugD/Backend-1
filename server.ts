import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.post("/", (req: Request, res: Response) => {
  res.send("Post");
});

app.put("/", (req: Request, res: Response) => {
  res.send("PUT");
});

app.delete("/", (req: Request, res: Response) => {
  res.send("DELETE");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
