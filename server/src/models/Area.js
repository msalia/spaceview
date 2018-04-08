import mongoose, {Schema} from 'mongoose';

const AreaSchema = new Schema({
  name: {type: String, trim: true},
});

export default mongoose.model('Area', AreaSchema);
