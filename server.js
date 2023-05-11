require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/bookModel')
const app = express()
app.use(express.json())

//declare route
app.get('/', (req, res) => {
    res.send('Welcome to the our library application')
})

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/book/:id', async (req, res) => {
    try {
        const {id} = req.params 
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/book', async (req, res) => {
    try {
        const book = await Book.create(req.body)
        res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/book/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);

        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.delete('/book/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(3000, () => {
            console.log(`Node API app is running on port 3000`)
        });
    }).catch((error) => {
        console.log(error)
    })
