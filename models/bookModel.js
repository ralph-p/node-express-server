const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a book name"]
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const Book = mongoose.model('Product', bookSchema);

module.exports = Book;