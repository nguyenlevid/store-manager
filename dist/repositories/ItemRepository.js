import { BaseRepository } from './BaseRepository.js';
import { Item } from '../models/Item.js';
export class ItemRepository extends BaseRepository {
  constructor() {
    super(Item);
  }
  // ============================================
  // CUSTOM QUERIES
  // ============================================
  /**
   * Find items by tags
   */
  async findByTags(tags) {
    return this.findAll({ tags: { $in: tags } });
  }
  /**
   * Find items with low stock
   */
  async findLowStock(threshold = 10) {
    return this.findAll({ quantity: { $lt: threshold } });
  }
  /**
   * Find items by price range
   */
  async findByPriceRange(minPrice, maxPrice) {
    return this.findAll({
      unitPrice: { $gte: minPrice, $lte: maxPrice },
    });
  }
  /**
   * Search items by name (case-insensitive)
   */
  async searchByName(searchTerm) {
    return this.findAll({
      name: { $regex: searchTerm, $options: 'i' },
    });
  }
  /**
   * Update item quantity (increment/decrement)
   */
  async updateQuantity(id, quantityChange) {
    return this.updateById(id, { $inc: { quantity: quantityChange } });
  }
  /**
   * Get items with aggregated data
   */
  async getItemsWithStats() {
    return Item.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$unitPrice', '$quantity'] } },
          avgPrice: { $avg: '$unitPrice' },
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ]);
  }
  /**
   * Get items grouped by tag
   */
  async getItemsByTag() {
    return Item.aggregate([
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
          items: { $push: { name: '$name', unitPrice: '$unitPrice' } },
        },
      },
      { $sort: { count: -1 } },
    ]);
  }
}
// Export singleton instance
export const itemRepository = new ItemRepository();
