import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';
import Car from '@/app/models/carSchema';

export async function PUT(req: Request, { params }: { params: { userId: string, index: string } }) {
  try {
    await connectDb();
    
    const { userId, index } = params;
    const { make, model, year } = await req.json(); 

 
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


    const carIdToUpdate = user.cars[carIndex];

 
    const updatedCar = await Car.findByIdAndUpdate(
      carIdToUpdate,
      { make, model, year }, 
      { new: true }
    );

    if (!updatedCar) {
      return NextResponse.json(
        { error: 'Car not found for update' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Car updated successfully', car: updatedCar },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating car:', error);
    return NextResponse.json(
      { error: 'Failed to update car', details: error.message },
      { status: 500 }
    );
  }
}
