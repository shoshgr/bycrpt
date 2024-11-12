import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  userId: { type: String, ref: 'UserDetails', required: true }
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;
