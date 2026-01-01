import mongoose, { Schema } from 'mongoose';
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    origin: {
      type: String,
    },
    tags: {
      type: [String],
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: [String],
    },
  },
  { timestamps: true },
);
itemSchema.index({ tags: 1 }, { unique: true });
export const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
