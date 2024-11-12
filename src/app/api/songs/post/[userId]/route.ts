import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import Song from '@/app/models/songsSchema';
import UserDetails from '@/app/models/userSchema';

export async function POST(req: Request, { params }: { params: { userId: string } }) {
    try {
        const { title, artist,type, year } = await req.json();
        const { userId } = params;
        if (!userId || !title ||!type|| !year || !artist) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await connectDb();

        const newSong = new Song({ title, artist,type, year, userId });
        await newSong.save();

        await UserDetails.findOneAndUpdate(
            { userId: userId },
            { $push: { Songs: newSong._id } },
            { new: true }
        );

        return NextResponse.json(
            { message: 'song added to user successfully', newSong: newSong },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding song to user:', error);
        return NextResponse.json(
            { error: 'Failed to add song to user', details: error.message },
            { status: 500 }
        );
    }
}
