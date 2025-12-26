import mongoose, { Schema, Document } from 'mongoose';

export type PartnerType = 'client' | 'supplier';

interface PartnerDocument extends Document {
  partnerType: PartnerType;
  partnerName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

const partnerSchema = new Schema<PartnerDocument>(
  {
    partnerType: {
      type: String,
      enum: ['client', 'supplier'],
      required: true,
    },
    partnerName: {
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
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

partnerSchema.index({ partnerName: 1 }, { unique: true });
partnerSchema.index({ email: 1 }, { unique: true, sparse: true });

export const Partner =
  mongoose.models.Partner ||
  mongoose.model<PartnerDocument>('Partner', partnerSchema);
