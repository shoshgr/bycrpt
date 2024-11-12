import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';
import Book from '@/app/models/booksSchema';

export async function PUT(req: Request, { params }: { params: { userId: string, index: string } }) {
  try {
    await connectDb();
    
    const { userId, index } = params;
    const { title, author, year } = await req.json(); 

 
    const bookIndex = parseInt(index, 10);
    if (isNaN(bookIndex) || bookIndex < 0) {
      return NextResponse.json(
        { error: 'Invalid book index' },
        { status: 400 }
      );
    }

  
    const user = await UserDetails.findOne({ userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (bookIndex >= user.books.length || bookIndex < 0) {
      return NextResponse.json(
        { error: 'book index out of range' },
        { status: 400 }
      );
    }


    const bookIdToUpdate = user.books[bookIndex];

 
    const updatedBook = await Book.findByIdAndUpdate(
      bookIdToUpdate,
      { title, author, year }, 
      { new: true }
    );

    if (!updatedBook) {
      return NextResponse.json(
        { error: 'book not found for update' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Book updated successfully', book: updatedBook },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating Book:', error);
    return NextResponse.json(
      { error: 'Failed to update Book', details: error.message },
      { status: 500 }
    );
  }
}
