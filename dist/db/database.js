/**
 * MongoDB Database Configuration
 *
 * This module provides MongoDB connection and configuration.
 */
import mongoose from 'mongoose';
import { env, validateEnv } from '../config/env.js';
// ============================================
// Database Connection
// ============================================
let isConnected = false;
export async function connectDatabase() {
  if (isConnected) {
    console.log('[Database] Already connected to MongoDB');
    return;
  }
  // Validate environment variables
  validateEnv();
  const mongoUri = env.MONGODB_URI;
  try {
    console.log('[Database] Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    isConnected = true;
    console.log('[Database] Successfully connected to MongoDB ✓');
  } catch (error) {
    console.error('[Database] MongoDB connection error:', error);
    if (error instanceof Error) {
      console.error('[Database] Error details:', error.message);
    }
    throw error;
  }
}
export function isDatabaseConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
