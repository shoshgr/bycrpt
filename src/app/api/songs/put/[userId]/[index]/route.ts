import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';
import Song from '@/app/models/songsSchema';

export async function PUT(req: Request, { params }: { params: { userId: string, index: string } }) {
    try {
        await connectDb();

        const { userId, index } = params;
        const { title, artist, type, year } = await req.json();


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
                { error: 'song index out of range' },
                { status: 400 }
            );
        }


        const songIdToUpdate = user.songs[songIndex];


        const updatedSong = await Song.findByIdAndUpdate(
            songIdToUpdate,
            { title, artist, type, year },
            { new: true }
        );

        if (!updatedSong) {
            return NextResponse.json(
                { error: 'Song not found for update' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Song updated successfully', song: updatedSong },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating Song:', error);
        return NextResponse.json(
            { error: 'Failed to update Song', details: error.message },
            { status: 500 }
        );
    }
}
