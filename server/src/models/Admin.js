import mongoose, {Schema} from 'mongoose';

const AdminSchema = new Schema({
  password: {type: String, trim: true},
  username: {type: String, trim: true},
});

export default mongoose.model('Admin', AdminSchema);
