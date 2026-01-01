import mongoose, { Schema } from 'mongoose';
const partnerSchema = new Schema(
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
  mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
