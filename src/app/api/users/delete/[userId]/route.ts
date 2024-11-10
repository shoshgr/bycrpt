import { NextResponse } from 'next/server';
import connectDb from '@/lib/db/db';
import UserDetails from '@/app/models/userSchema';
import UserCredentials from '@/app/models/registerSchema';

export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
  try {
    
    await connectDb();
    const { userId } = params;

    
    const deletedUser = await UserDetails.findOneAndDelete({ userId });
const deletePass=await UserCredentials.findOneAndDelete({ userId });

    if (!deletedUser||!deletePass) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully', user: deletedUser }, { status: 200 });

  } catch (error) {
    console.error('Error deleting user by userId:', error);

    return NextResponse.json(
      { error: 'Failed to delete user', details: error.message },
      { status: 500 }
    );
  }
}
