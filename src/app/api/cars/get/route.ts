import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db'; 
import Car from '@/app/models/carSchema';  

export async function GET() {
  try {

    await connectDb();

    const users = await Car.find();  

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
