const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a book name"]
        },
        author: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;