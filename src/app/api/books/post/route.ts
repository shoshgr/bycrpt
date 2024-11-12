import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import Book from '@/app/models/booksSchema';
import UserDetails from '@/app/models/userSchema';

export async function POST(req) {
  try {
    const { userId, title, author, year } = await req.json();

    if (!userId || !title || !year || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

    const newBook = new Book({ title, author, year ,userId});
    await newBook.save();


    await UserDetails.findOneAndUpdate(
      { userId: userId },
      { $push: { books: newBook._id} },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Book added to user successfully', newBook: newBook },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding Book to user:', error);
    return NextResponse.json(
      { error: 'Failed to add Book to user', details: error.message },
      { status: 500 }
    );
  }
}
