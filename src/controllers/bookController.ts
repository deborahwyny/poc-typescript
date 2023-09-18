import { Request, Response } from "express";
import Joi from "joi";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
}

const books: Book[] = [];

const bookSchemas = Joi.object<Book>({
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  year: Joi.number(),
});

export const getAllBooks = (req: Request, res: Response) => {
  res.json(books);
};

export const createBook = (req: Request, res: Response) => {
  const { title, author, genre, year } = req.body;
  const id = books.length + 1;

  const { error } = bookSchemas.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newBook: Book = {
    id,
    title,
    author,
    genre,
    year,
  };

  books.push(newBook);

  res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, author, genre, year } = req.body;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Livro não encontrado." });
  }

  book.title = title;
  book.author = author;
  book.genre = genre;
  book.year = year;

  res.json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Livro não encontrado." });
  }

  books.splice(index, 1);

  res.sendStatus(204);
};