require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/bookModel')
const app = express()

//declare route
app.get('/', (req, res) => {
    res.send('Welcome to the our library application')
})

app.get('/books', async(req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(3000, () => console.log('Library Server Started on port 3000'))
