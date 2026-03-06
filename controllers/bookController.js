const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({ user: req.user }).sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, genre, status, rating, notes } = req.body;

        if (!title || !author) {
            return res.status(400).json({ message: "Title and author are required" });
        }

        const book = await Book.create({
            user: req.user,
            title,
            author,
            genre,
            status,
            rating,
            notes,
        });

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id, user: req.user });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id, user: req.user });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};