import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import Car from '@/app/models/carSchema';
import UserDetails from '@/app/models/userSchema';

export async function POST(req: Request, { params }: { params: { userId: string } }) {
    try {
        const { make, model, year } = await req.json();
        const { userId } = params;
        if (!userId || !make || !year || !model) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await connectDb();

        const newCar = new Car({ make, model, year, userId });
        await newCar.save();

        await UserDetails.findOneAndUpdate(
            { userId: userId },
            { $push: { cars: newCar._id } },
            { new: true }
        );

        return NextResponse.json(
            { message: 'Car added to user successfully', newCar: newCar },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding car to user:', error);
        return NextResponse.json(
            { error: 'Failed to add car to user', details: error.message },
            { status: 500 }
        );
    }
}
