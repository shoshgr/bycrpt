import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';
import Song from '@/app/models/songsSchema';

export async function DELETE(req: Request, { params }: { params: { userId: string, index: string } }) {
  try {
    await connectDb();
    
    const { userId, index } = params;

    const songIndex = parseInt(index, 10);
    if (isNaN(songIndex) || songIndex < 0) {
      return NextResponse.json(
        { error: 'Invalid song index' },
        { status: 400 }
      );
    }

    const user = await UserDetails.findOne({ userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (songIndex >= user.songs.length || songIndex < 0) {
      return NextResponse.json(
        { error: 'Car index out of range' },
        { status: 400 }
      );
    }

   
    const songIdToDelete = user.songs[songIndex];

  
    await Song.findByIdAndDelete(songIdToDelete);

  
    await UserDetails.findOneAndUpdate(
      { userId: userId },
      { $pull: { songs: songIdToDelete } },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Song removed from user successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing Song from user:', error);
    return NextResponse.json(
      { error: 'Failed to remove Song from user', details: error.message },
      { status: 500 }
    );
  }
}
