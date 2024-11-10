import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },  
  model: { type: String, required: true }, 
  year: { type: Number, required: true },  
  userId: { type: String, ref: 'UserDetails', required: true }, 
});

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);
export default Car;
