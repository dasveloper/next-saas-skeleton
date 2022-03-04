import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
    unique: true,
  },
  members: {
    type: [String],
  },
}, { timestamps: true });

TeamSchema.index({ owner: 1 });

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
