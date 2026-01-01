import mongoose, { Schema } from 'mongoose';
const transactionSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Partner',
      required: true,
    },
    item: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
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
    itemsDeliveredDate: {
      type: Date,
    },
    paymentCompletedDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'itemsDelivered', 'paymentCompleted', 'cancelled'],
      required: true,
    },
  },
  { timestamps: true },
);
transactionSchema.index({ clientId: 1 }, { unique: true });
transactionSchema.index({ status: 1 });
transactionSchema.index({ itemsDeliveredDate: 1 });
transactionSchema.index({ paymentCompletedDate: 1 });
export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model('Transaction', transactionSchema);
