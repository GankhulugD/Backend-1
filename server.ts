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
  const maxId =
    books.length > 0 ? Math.max(...books.map((book) => book.id)) : 0;
  const newBook = { id: maxId + 1, title, author };
  books.push(newBook);
  res.send(books);
});

// UPTADE (Update book by id)
server.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const findedBook = books.findIndex((book) => String(book.id) === String(id));
  if (findedBook !== -1) {
    books[findedBook] = { ...books[findedBook], title, author };
    res.send(books);
  } else {
    res.status(404).send("not found id");
  }
});

// DELETE (Delete book by id)
server.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const findedBook = books.findIndex((book) => String(book.id) === String(id));
  if (findedBook !== -1) {
    books.splice(findedBook, 1);
    res.status(200).send(books);
  } else {
    res.status(404).send("not found id");
  }
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
