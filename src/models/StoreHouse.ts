import mongoose, { Schema, Document } from 'mongoose';

export interface StoreHouseDocument extends Document {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  business: mongoose.Types.ObjectId;
}

const storeHouseSchema = new Schema<StoreHouseDocument>(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
  },
  { timestamps: true },
);

storeHouseSchema.index({ name: 1 });
storeHouseSchema.index({ email: 1 });

export const StoreHouse =
  mongoose.models.StoreHouse ||
  mongoose.model<StoreHouseDocument>('StoreHouse', storeHouseSchema);
