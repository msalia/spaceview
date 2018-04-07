import mongoose, {Schema} from 'mongoose';

const ConfigSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
  logo: {type: String, trim: true},
  name: {type: String, trim: true},
  roomMapping: [
    {
      name: {type: String, trim: true},
      room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
    },
  ],
});

export default mongoose.model('Config', ConfigSchema);
