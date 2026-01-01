/**
 * Database Configuration & Factory
 *
 * This module provides a unified database interface that switches between
 * local JSON file storage (development) and MongoDB (production).
 *
 * Environment Variables:
 * - NODE_ENV: 'dev' | 'prod' | 'test' (automatically determines DB mode)
 * - DB_MODE: 'local' | 'mongodb' (optional override)
 * - MONGODB_URI: MongoDB connection string (required when using mongodb)
 */

import { localDb } from './localDb';

// ============================================
// Database Mode Configuration
// ============================================

export type DbMode = 'local' | 'mongodb';

export function getDbMode(): DbMode {
  // If DB_MODE is explicitly set, use it (for manual override)
  const explicitMode = process.env.DB_MODE?.toLowerCase();
  if (explicitMode === 'mongodb') {
    return 'mongodb';
  }
  if (explicitMode === 'local') {
    return 'local';
  }

  // Otherwise, determine based on NODE_ENV
  const nodeEnv = process.env.NODE_ENV?.toLowerCase();

  if (nodeEnv === 'prod' || nodeEnv === 'production') {
    return 'mongodb'; // Production uses MongoDB
  }

  // Development, test, or any other environment uses local
  return 'local';
}

export function isLocalMode(): boolean {
  return getDbMode() === 'local';
}

export function isMongoMode(): boolean {
  return getDbMode() === 'mongodb';
}

// ============================================
// Database Connection Status
// ============================================

let isConnected = false;

/**
 * Seed local database with sample data
 */
export async function seedLocalDatabase(): Promise<void> {
  if (!isLocalMode()) {
    console.log('[Database] Seeding is only available in local mode');
    return;
  }

  console.log('[Database] Seeding local database with sample data...');

  // Dynamic import to avoid loading seed data unless needed
  const { seedItems, seedPartners, seedUsers, seedTransactions, seedImports } =
    await import('./seedData');

  // Clear existing data
  await localDb.items.deleteMany({});
  await localDb.partners.deleteMany({});
  await localDb.users.deleteMany({});
  await localDb.transactions.deleteMany({});
  await localDb.imports.deleteMany({});

  // Insert seed data
  await localDb.items.insertMany(seedItems);
  await localDb.partners.insertMany(seedPartners);
  await localDb.users.insertMany(seedUsers);
  await localDb.transactions.insertMany(seedTransactions);
  await localDb.imports.insertMany(seedImports);

  console.log(`[Database] Seeded ${seedItems.length} items`);
  console.log(`[Database] Seeded ${seedPartners.length} partners`);
  console.log(`[Database] Seeded ${seedUsers.length} users`);
  console.log('[Database] Database seeding completed ✓');
}

export async function connectDatabase(): Promise<void> {
  const mode = getDbMode();

  if (mode === 'local') {
    console.log('[Database] Using LOCAL JSON file storage');
    console.log('[Database] Data directory: ./localData/');

    // Check if we should seed the database
    const shouldSeed = process.env.SEED_DB?.toLowerCase() === 'true';
    if (shouldSeed) {
      await seedLocalDatabase();
    }

    isConnected = true;
    return;
  }

  if (mode === 'mongodb') {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        '[Database] MONGODB_URI environment variable is required when DB_MODE=mongodb',
      );
    }

    console.log('[Database] Connecting to MongoDB...');

    // TODO: Implement actual MongoDB connection
    // import mongoose from 'mongoose';
    // await mongoose.connect(mongoUri);

    console.log('[Database] MongoDB connection not yet implemented');
    console.log('[Database] Falling back to LOCAL mode');

    isConnected = true;
    return;
  }
}

export function isDatabaseConnected(): boolean {
  return isConnected;
}

// ============================================
// Unified Database Interface
// ============================================

/**
 * Get the database instance based on current mode.
 *
 * Usage:
 * ```typescript
 * import { getDb } from './db/database';
 *
 * const db = getDb();
 * const items = await db.items.find();
 * ```
 */
export function getDb() {
  const mode = getDbMode();

  if (mode === 'local') {
    return localDb;
  }

  // TODO: Return MongoDB models when implemented
  // if (mode === 'mongodb') {
  //   return {
  //     items: Item,        // Mongoose model
  //     partners: Partner,
  //     transactions: Transaction,
  //     imports: Import,
  //     users: User,
  //   };
  // }

  // Fallback to local
  return localDb;
}

// ============================================
// Export for convenience
// ============================================

// Direct access to db (resolves based on mode)
export const db = getDb();

export default db;
