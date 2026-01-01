/**
 * Repositories - Data Access Layer
 *
 * Import repository singletons for optimized database access:
 * ```typescript
 * import { itemRepository, partnerRepository } from '@/repositories';
 *
 * // Optimized read (lean)
 * const items = await itemRepository.findAll();
 *
 * // Write operations
 * const newItem = await itemRepository.create({ name: 'Apple', ... });
 * ```
 */

export { BaseRepository } from './BaseRepository';
export { ItemRepository, itemRepository } from './ItemRepository';
