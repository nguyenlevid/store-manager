import mongoose, { Schema, Document } from 'mongoose';

export interface ItemDocument extends Document {
  name: string;
  description: string;
  unitPrice: number;
  origin: string;
  tags: string[];
  quantity: number;
  unit: string;
  imageUrl: string[];
  storeHouse: mongoose.Types.ObjectId;
}

const itemSchema = new Schema<ItemDocument>(
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
    storeHouse: {
      type: Schema.Types.ObjectId,
      ref: 'StoreHouse',
      required: true,
    },
  },
  { timestamps: true },
);

itemSchema.index({ name: 1 }, { unique: true });
itemSchema.index({ tags: 1 });
itemSchema.index({ unitPrice: 1 });
itemSchema.index({ quantity: 1 });
itemSchema.index({ storeHouse: 1 });

export const Item =
  mongoose.models.Item || mongoose.model<ItemDocument>('Item', itemSchema);
