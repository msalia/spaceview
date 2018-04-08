import mongoose, {Schema} from 'mongoose';

const RoomSchema = new Schema({
  area: {
    type: Schema.Types.ObjectId,
    ref: 'Area',
  },
  location: {type: String, trim: true},
});

export default mongoose.model('Room', RoomSchema);
