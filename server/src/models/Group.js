import mongoose, {Schema} from 'mongoose';

const GroupSchema = new Schema({
  name: {type: String, trim: true},
  pin: {type: Number},
});

export default mongoose.model('Group', GroupSchema);
