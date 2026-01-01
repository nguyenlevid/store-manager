/**
 * Repositories - Data Access Layer
 *
 * Import repository singletons for optimized database access:
 * ```typescript
 * import { itemRepository, partnerRepository } from '../repositories/index.js';
 *
 * // Optimized read (lean)
 * const items = await itemRepository.findAll();
 *
 * // Write operations
 * const newItem = await itemRepository.create({ name: 'Apple', ... });
 * ```
 */
export { BaseRepository } from './BaseRepository.js';
export { ItemRepository, itemRepository } from './ItemRepository.js';
export { PartnerRepository, partnerRepository } from './PartnerRepository.js';
export {
  TransactionRepository,
  transactionRepository,
} from './TransactionRepository.js';
export { ImportRepository, importRepository } from './ImportRepository.js';
export { UserRepository, userRepository } from './UserRepository.js';
