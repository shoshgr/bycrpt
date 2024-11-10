import mongoose from 'mongoose';


const userDetailsSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails' }],
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});


const UserDetails = mongoose.models.UserDetails || mongoose.model('UserDetails', userDetailsSchema);

export default UserDetails;
