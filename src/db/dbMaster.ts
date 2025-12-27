/**
 * Database Master - Unified Model Interface
 *
 * Import models from here and they automatically route to local or MongoDB:
 *
 * ```typescript
 * import { Item, Partner, User } from './db/dbMaster';
 *
 * // Works in both local and MongoDB modes!
 * const items = await Item.find();
 * const newItem = await Item.create({ name: 'Apple', ... });
 * ```
 */

import { getDb } from './database';

// Get the database instance (already configured based on environment)
const db = getDb();

// Export collections/models with consistent interface
export const Item = db.items;
export const Partner = db.partners;
export const Transaction = db.transactions;
export const Import = db.imports;
export const User = db.users;

// Also export the types for convenience
export type {
  ItemDoc,
  PartnerDoc,
  TransactionDoc,
  ImportDoc,
  UserDoc,
  PartnerType,
  TransactionStatus,
  ImportStatus,
  AppRole,
} from './localDb';
