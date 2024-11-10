import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {

    await connectDb();
    const { userId } = params;


    const user = await UserDetails.findOne({ userId: userId });
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'User fetched successfully', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user by userId:', error);

    return NextResponse.json(
      { error: 'Failed to fetch user', details: error.message },
      { status: 500 }
    );
  }
}
