import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';
import Car from '@/app/models/carSchema';

export async function DELETE(req: Request, { params }: { params: { userId: string, index: string } }) {
  try {
    await connectDb();
    
    const { userId, index } = params;

    const carIndex = parseInt(index, 10);
    if (isNaN(carIndex) || carIndex < 0) {
      return NextResponse.json(
        { error: 'Invalid car index' },
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

    if (carIndex >= user.cars.length || carIndex < 0) {
      return NextResponse.json(
        { error: 'Car index out of range' },
        { status: 400 }
      );
    }

   
    const carIdToDelete = user.cars[carIndex];

  
    await Car.findByIdAndDelete(carIdToDelete);

  
    await UserDetails.findOneAndUpdate(
      { userId: userId },
      { $pull: { cars: carIdToDelete } },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Car removed from user successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing car from user:', error);
    return NextResponse.json(
      { error: 'Failed to remove car from user', details: error.message },
      { status: 500 }
    );
  }
}
