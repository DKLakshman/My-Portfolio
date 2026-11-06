import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    tags: { type: [String], default: [] },
    liveUrl: { type: String, trim: true },
    repoUrl: { type: String, trim: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
