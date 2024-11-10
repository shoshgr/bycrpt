
import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';

export async function PUT(req: Request, { params }: { params: { userId: string } }) {
    try {

        await connectDb();
        const data = await req.json();
        const { userId } = params;


        const user = await UserDetails.findOne({ userId: userId });
        console.log(user);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        user.firstName = data.firstName || user.firstName;
        user.lastName = data.lastName || user.lastName;
        user.email = data.email || user.email;
        user.phone = data.phone || user.phone;
        user.address = data.address || user.address;

        await user.save();

        return NextResponse.json(
            { message: 'User updated successfully', user },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching user by userId:', error);

        return NextResponse.json(
            { error: 'Failed to fetch user', details: error.message },
            { status: 500 }
        );
    }
}
