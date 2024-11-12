import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import Song from '@/app/models/songsSchema';
import UserDetails from '@/app/models/userSchema';

export async function POST(req) {
  try {
    const { userId, title, artist,type, year } = await req.json();

    if (!userId || !artist || !year || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDb();

    const newSong = new Song({ title, artist,type, year ,userId});
    await newSong.save();


    await UserDetails.findOneAndUpdate(
      { userId: userId },
      { $push: { songs: newSong._id} },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Song added to user successfully', newSong: newSong },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding Song to user:', error);
    return NextResponse.json(
      { error: 'Failed to add Song to user', details: error.message },
      { status: 500 }
    );
  }
}
