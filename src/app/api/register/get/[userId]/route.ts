// import { NextResponse } from 'next/server';
// import connectDb from '@/lib/db/db';
// import UserCredentials from '@/app/models/registerSchema';

// export async function GET(req: Request, { params }: { params: { userId: string } }) {
//   try {

//     await connectDb();
//     const { userId } = params;


//     const user = await UserCredentials.findOne({ userId: userId });
//     console.log(user);

//     if (!user) {
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: 'User fetched successfully', user },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error fetching user by userId:', error);

//     return NextResponse.json(
//       { error: 'Failed to fetch user', details: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import bcrypt from 'bcryptjs';  // או 'bcrypt' אם אתה משתמש במודול bcrypt
import UserCredentials from '@/app/models/registerSchema';

export async function POST(req: Request) {
  try {
    // קבלת נתוני המשתמש מתוך הבקשה
    const { userId, password } = await req.json();

    // התחברות לבסיס הנתונים
    await connectDb();

    // חיפוש המשתמש לפי ID
    const user = await UserCredentials.findOne({ userId: userId });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // השוואת הסיסמה שהתקבלה עם הסיסמה המוצפנת בבסיס הנתונים
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // במקרה של הצלחה: החזרת משתמש מאומת
    return NextResponse.json(
      { message: 'User authenticated successfully', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error authenticating user:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate user', details: error.message },
      { status: 500 }
    );
  }
}
