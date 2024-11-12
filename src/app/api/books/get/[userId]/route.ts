import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    await connectDb();
    const { userId } = params;

    const user = await UserDetails.findOne({ userId }).populate('books');
    console.log(user.books);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }


    return NextResponse.json(
      { message: 'Users books fetched successfully',books: user.books },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user and books by userId:', error);

    return NextResponse.json(
      { error: 'Failed to fetch user and books', details: error.message },
      { status: 500 }
    );
  }
}
