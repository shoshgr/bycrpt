import mongoose from 'mongoose';


const friendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails', required: true },
  friend: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails', required: true },
  dateAdded: { type: Date, default: Date.now } 
});


const Friend = mongoose.models.Friend || mongoose.model('Friend', friendSchema);

export default Friend;
