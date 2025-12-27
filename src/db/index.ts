/**
 * Database Module Entry Point
 *
 * Import from here for simplified access:
 * ```typescript
 * import { db, connectDatabase, isLocalMode } from './db';
 * ```
 */

// Main database interface
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
  type LocalBaseDocument,
  type LocalItemDoc,
  type LocalPartnerDoc,
  type LocalTransactionDoc,
  type LocalImportDoc,
  type LocalUserDoc,
  type LocalPartnerType,
  type LocalTransactionStatus,
  type LocalImportStatus,
  type LocalAppRole,
} from './localDb';
