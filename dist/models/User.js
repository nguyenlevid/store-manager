import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }, // hashed password
    phoneNumber: {
      type: String,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    appRole: {
      type: String,
      enum: ['dev', 'admin', 'user'],
      default: 'user',
    },
    accessRole: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'CustomRole',
        },
      ],
      default: [],
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    resetPasswordToken: {
      type: Schema.Types.ObjectId,
      ref: 'TokenStore',
    },
  },
  { timestamps: true },
);
// FUNCTIONS
// Existing indexes
userSchema.index({ username: 1 }, { unique: true, sparse: true });
userSchema.index({ email: 1 }, { unique: true });
// Additional indexes for optimal query performance
// Note: Cannot create compound index on two array fields (business and accessRole are both arrays)
userSchema.index({ accessRole: 1 }); // For role filtering
userSchema.index({ business: 1 }); // For business employee reports
export const User = mongoose.models.User || mongoose.model('User', userSchema);
