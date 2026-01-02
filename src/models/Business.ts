import mongoose, { Schema, Document } from 'mongoose';

export interface BusinessDocument extends Document {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

const businessSchema = new Schema<BusinessDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true },
);

businessSchema.index({ name: 1 });
businessSchema.index({ email: 1 }, { unique: true, sparse: true });

export const Business =
  mongoose.models.Business ||
  mongoose.model<BusinessDocument>('Business', businessSchema);
