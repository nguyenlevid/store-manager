/**
 * Database Module - Repository-First Architecture
 *
 * RECOMMENDED: Use repositories for all database operations:
 * ```typescript
 * import { itemRepository, connectDatabase } from '../db/index.js';
 *
 * await connectDatabase();
 * const items = await itemRepository.findAll(); // Optimized with lean()
 * ```
 *
 * For advanced use cases requiring full Mongoose documents:
 * ```typescript
 * import { Item } from '../models/Item.js';
 * const item = await Item.findById(id); // Full document with methods
 * await item.save();
 * ```
 */
// ============================================
// DATABASE CONNECTION
// ============================================
export { connectDatabase, isDatabaseConnected } from './database.js';
// ============================================
// REPOSITORIES (Primary Data Access)
// ============================================
export {
  itemRepository,
  partnerRepository,
  transactionRepository,
  importRepository,
  userRepository,
} from '../repositories/index.js';
