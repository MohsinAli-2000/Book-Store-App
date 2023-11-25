import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Routes for books

//route for getting single  book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).send(book);
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//route to update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Provide all required fields",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(500).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated Successfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//route for getting all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Route for creating book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Provide all required fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
});

//route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(500).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
