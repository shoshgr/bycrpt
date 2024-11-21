import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import bcrypt from 'bcryptjs';
import UserDetails from '@/app/models/userSchema';
import UserCredentials from '@/app/models/registerSchema';

export async function POST(req) {
  console.error('Entering the POST request handler');
  try {
    const { userId, firstName, lastName, email, phone, address, password } = await req.json();
    debugger;
    if (!userId || !firstName || !lastName || !email || !phone || !address || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

    const existingUser = await UserCredentials.findOne({ $or: [{ userId }, { email }] });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.error('Hashed Password:', hashedPassword);

    const newUser = new UserDetails({ userId, firstName, lastName, email, phone, address });
    await newUser.save();

    const username = firstName;
    const newUserCredentials = new UserCredentials({
      userId,
      username,
      password: hashedPassword,
    });
    await newUserCredentials.save();

    return NextResponse.json(
      { message: 'User created successfully', user: hashedPassword },
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
