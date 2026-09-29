import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    renk: { type: String },
    baslik: { type: String, trim: true },
    ufakbaslik: { type: String, trim: true },
    acikla: { type: String, trim: true },
    aciklaiki: { type: String, trim: true },
    selectedFile: { type: String },
    video: { type: String },
    film: { type: String },
    top10: { type: String },
    yeni: { type: String },
    tags: { type: [String], default: [] },
    comments: { type: [mongoose.Schema.Types.Mixed], default: [] },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    likeCount: { type: Number, default: 0, min: 0 },
    goruntuCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

postSchema.index({ tags: 1, _id: -1 });

export const Post = mongoose.model('Post', postSchema);
