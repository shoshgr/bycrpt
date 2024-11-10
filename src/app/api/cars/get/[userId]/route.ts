import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    await connectDb();
    const { userId } = params;

    // חיפוש משתמש לפי userId והבאת המערך של הרכבים שלו
    const user = await UserDetails.findOne({ userId }).populate('cars');
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    
    // אם יש רכבים, הם יופיעו כחלק מהאובייקט המוחזר של המשתמש
    return NextResponse.json(
      { message: 'User and cars fetched successfully', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user and cars by userId:', error);

    return NextResponse.json(
      { error: 'Failed to fetch user and cars', details: error.message },
      { status: 500 }
    );
  }
}
