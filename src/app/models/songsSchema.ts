import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  type: { type: String, required: true },
  year: { type: Number, required: true },
  userId: { type: String, ref: 'UserDetails', required: true },
});

const Song = mongoose.models.Song || mongoose.model('Song', songSchema);
export default Song;
