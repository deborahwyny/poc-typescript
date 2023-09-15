import express, { Request, Response } from "express";
import Joi from "joi";



const app = express();
app.use(express.json());

/// livros
interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
}

//schemma

const bookSchemmas = Joi.object<Book>({
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  year: Joi.number()
})

///lista livros
const books: Book[] = []

///get livros
app.get("/book", (req: Request, res: Response) => {
  res.json(books)
});


/// post livros
app.post("/book", (req:Request, res: Response)=>{
 const { title,author,genre,year} = req.body
 const id = books.length + 1;

 const {error} = bookSchemmas.validate(req.body)
 if (error) {return res.status(400).json({ error: error.details[0].message })}

 const newBook: Book = {
  id,
  title,
  author,
  genre,
  year,
}

books.push(newBook)

res.status(201).json(newBook)
})

/// atualizar 
app.put("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { title, author, genre, year } = req.body
  const book = books.find((b) => b.id === id)

  if (!book) {return res.status(404).json({ error: "Livro não encontrado." })}

  book.title = title
  book.author = author
  book.genre = genre
  book.year = year

  res.json(book)
});

/// deletar
app.delete("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id)

  if (index === -1) {
    return res.status(404).json({ error: "Livro não encontrado." })
  }

  books.splice(index, 1)

  res.sendStatus(204)
});



app.listen(5000, () => {
  console.log(`Server is up and running on port 5000`);
})


