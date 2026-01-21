import mongoose, { Schema, Document } from 'mongoose';

export type AppRole = 'dev' | 'admin' | 'user';

export interface UserDocument extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
  business: mongoose.Types.ObjectId;
  storeHouses: mongoose.Types.ObjectId[];
  appRole: AppRole;
  accessRole: mongoose.Types.ObjectId[];
  resetPasswordToken: mongoose.Schema.Types.ObjectId;
  // METHODS
  verifyPassword(inputPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
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
          ref: 'Cu  stomRole',
        },
      ],
      default: [],
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    storeHouses: {
      type: [Schema.Types.ObjectId],
      ref: 'StoreHouse',
      default: [],
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

export const User =
  mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
