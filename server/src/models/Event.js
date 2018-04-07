import mongoose, {Schema} from 'mongoose';

const EventSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
    name: {type: String, trim: true},
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    endTime: {type: Number},
    startTime: {type: Number},
  },
  {timestamps: true},
);

export default mongoose.model('Event', EventSchema);
