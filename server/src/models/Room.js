import mongoose, {Schema} from 'mongoose';

const RoomSchema = new Schema({
  location: {type: String, trim: true},
});

export default mongoose.model('Room', RoomSchema);
