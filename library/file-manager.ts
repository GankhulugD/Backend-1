import fs from "node:fs/promises";
import { Book } from "./types";

const FILE_PATH = "./books.json";

// Read
export const readBooks = async (): Promise<Book[]> => {
  try {
    const data = await fs.readFile(FILE_PATH, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.error("error read:", err);
    return [];
  }
};

// Write
export const writeBooks = async (books: Book[]): Promise<void> => {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2));
  } catch (err) {
    console.error("error write:", err);
  }
};
