import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import bcrypt from 'bcryptjs';
import UserCredentials from '@/app/models/registerSchema';

export async function POST(req) {
  try {
    // קבלת הנתונים מה-body של הבקשה
    const { userId, password } = await req.json();

    // חיבור לבסיס נתונים
    await connectDb();

    // חיפוש משתמש על פי ה-userId
    const user = await UserCredentials.findOne({ userId: userId });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // השוואת הסיסמה שהוזנה עם הסיסמה המוצפנת בבסיס הנתונים
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return NextResponse.json(
        { message: 'Login successful', user },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { error: 'Login failed', details: error.message },
      { status: 500 }
    );
  }
}
