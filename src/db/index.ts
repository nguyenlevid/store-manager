/**
 * Database Module Entry Point
 *
 * RECOMMENDED: Import models from dbMaster for auto-routing:
 * ```typescript
 * import { Item, Partner, User } from './db/dbMaster';
 * const items = await Item.find();
 * ```
 *
 * Alternative: Use the full db object:
 * ```typescript
 * import { db, connectDatabase } from './db';
 * ```
 */

// ⭐ RECOMMENDED: Auto-routing models
export {
  Item,
  Partner,
  Transaction,
  Import,
  User,
  type ItemDoc,
  type PartnerDoc,
  type TransactionDoc,
  type ImportDoc,
  type UserDoc,
  type PartnerType,
  type TransactionStatus,
  type ImportStatus,
  type AppRole,
} from './dbMaster';

// Database utilities
export {
  db,
  getDb,
  connectDatabase,
  seedLocalDatabase,
  isDatabaseConnected,
  getDbMode,
  isLocalMode,
  isMongoMode,
  type DbMode,
} from './database';

// Local database (for direct access when needed)
export {
  localDb,
  LocalCollection,
  ValidationError,
  type BaseDocument,
} from './localDb';
