import express from "express";
import type { Request, Response } from "express";
import { readBooks, writeBooks } from "./file-manager";

const server = express();
const port = 3000;

server.use(express.json());

server.get("/library/:category/:bookId", (req: Request, res: Response) => {
  const { category, bookId } = req.params;
  const { lang } = req.query;
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== "secret-key-123") {
    return res.status(401).json({ error: "Хандах эрхгүй" });
  }

  res.status(200).json({
    status: "success",
    request_info: {
      method: req.method,
      path: req.originalUrl,
    },
    extracted_data: {
      category: category,
      id: bookId,
      language: lang || "mn",
      auth: "Verified",
    },
  });
});

// 1. READ ALL
server.get("/books", async (req: Request, res: Response) => {
  const books = await readBooks();
  res.json(books);
});

// 2. CREATE
server.post("/books", async (req: Request, res: Response) => {
  const { title, author } = req.body;
  const books = await readBooks();

  const maxId = books.length > 0 ? Math.max(...books.map((b) => b.id)) : 0;
  const newBook = { id: maxId + 1, title, author };

  books.push(newBook);
  await writeBooks(books);
  res.status(201).json(books);
});

// 3. UPDATE
server.put("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const books = await readBooks();

  const index = books.findIndex((b) => String(b.id) === id);
  if (index !== -1) {
    books[index] = { ...books[index], title, author };
    await writeBooks(books);
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

// 4. DELETE
server.delete("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let books = await readBooks();

  const exists = books.some((b) => String(b.id) === id);
  if (exists) {
    books = books.filter((b) => String(b.id) !== id);
    await writeBooks(books);
    res.json({ books });
  } else {
    res.status(404).json({ message: "not found" });
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
