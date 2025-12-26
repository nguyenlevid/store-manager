import mongoose, { Schema, Document } from 'mongoose';

export type ImportStatus = 'pending' | 'done';

interface ImportDocument extends Document {
  supplierId: mongoose.Types.ObjectId;
  item: {
    itemId: mongoose.Types.ObjectId;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalPrice: number;
  status: ImportStatus;
  completedDate: Date;
}

const importSchema = new Schema<ImportDocument>(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    item: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'done'],
      required: true,
    },
    completedDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

importSchema.index({ supplierId: 1 }, { unique: true });
importSchema.index({ completedDate: 1 });
importSchema.index({ status: 1 });

export const Import =
  mongoose.models.Import ||
  mongoose.model<ImportDocument>('Import', importSchema);
