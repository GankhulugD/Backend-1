import express from "express";
import type { Request, Response } from "express";

const books = [
  {
    id: 2,
    title: "Harry potter 1",
    author: "bat",
  },
  {
    id: 1,
    title: "Harry potter 2",
    author: "bat",
  },
];

const server = express();
const port = "3000";

server.use(express.json()); // body parser

server.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

// READ ALL (Get all books)
server.get("/books", (req: Request, res: Response) => {
  res.status(200).send(books);
});

// READ ONE (Get book by id)
server.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((book) => String(book.id) === String(id));
  res.status(200).send(book);
});

// CREATE (Add new book)
server.post("/books", (req: Request, res: Response) => {
  const { title, author } = req.body;
  const newBookId = books.length + 1;
  const newBook = { id: newBookId, title, author };
  books.push(newBook);
  res.send(books);
});

// DELETE (Delete book by id)
server.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((book) => String(book.id) === String(id));
  if(){
  books.splice(book);
  res.status(200).send(books);}else{
    
  }
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
