import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import Book from '@/app/models/booksSchema';
import UserDetails from '@/app/models/userSchema';

export async function POST(req: Request, { params }: { params: { userId: string } }) {
    try {
        const { title, author, year } = await req.json();
        const { userId } = params;
        if (!userId || !title || !author || !year) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await connectDb();

        const newBook = new Book({ title, author, year, userId });
        await newBook.save();

        await UserDetails.findOneAndUpdate(
            { userId: userId },
            { $push: { books: newBook._id } },
            { new: true }
        );

        return NextResponse.json(
            { message: 'Book added to user successfully', newBook: newBook },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding book to user:', error);
        return NextResponse.json(
            { error: 'Failed to add book to user', details: error.message },
            { status: 500 }
        );
    }
}
