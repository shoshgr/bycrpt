import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';
import Book from '@/app/models/booksSchema';

export async function DELETE(req: Request, { params }: { params: { userId: string, index: string } }) {
  try {
    await connectDb();
    
    const { userId, index } = params;

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
        { error: 'Book index out of range' },
        { status: 400 }
      );
    }

   
    const bookIdToDelete = user.books[bookIndex];

  
    await Book.findByIdAndDelete(bookIdToDelete);

  
    await UserDetails.findOneAndUpdate(
      { userId: userId },
      { $pull: { books: bookIdToDelete } },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Book removed from user successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing Book from user:', error);
    return NextResponse.json(
      { error: 'Failed to remove Book from user', details: error.message },
      { status: 500 }
    );
  }
}
