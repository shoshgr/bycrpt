// UserCredentials.ts
import mongoose from 'mongoose';

const userCredentialsSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, ref: 'UserDetails', required: true } 
});

const UserCredentials = mongoose.models.UserCredentials || mongoose.model('UserCredentials', userCredentialsSchema);

export default UserCredentials;
