import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db'; 
import UserDetails from '@/app/models/userSchema';  

export async function GET() {
  try {

    await connectDb();

    const users = await UserDetails.find();  

    return NextResponse.json(
      { message: 'Users fetched successfully', users },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    );
  }
}
