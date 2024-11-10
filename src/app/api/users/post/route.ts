import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db'; 

import UserDetails from '@/app/models/userSchema'; 
import UserCredentials from '@/app/models/registerSchema'; 


export async function POST(req) {
  try {
    const { userId,firstName, lastName, email, phone, address, password } = await req.json();

    if (!userId||!firstName || !lastName || !email || !phone || !address || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

  
    const newUser = new UserDetails({ userId,firstName, lastName, email, phone, address });
    await newUser.save();

    const username = firstName;

    const newUserCredentials = new UserCredentials({
       userId,  
       username,
       password,
    });
    await newUserCredentials.save();

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
}
