import { BaseRepository } from './BaseRepository';
import { Item, ItemDocument } from '@/models/Item';

export class ItemRepository extends BaseRepository<ItemDocument> {
  constructor() {
    super(Item);
  }

  // ============================================
  // CUSTOM QUERIES
  // ============================================

  async createItem(itemData: Partial<ItemDocument>) {
    return this.create(itemData);
  }

  async findById(id: string) {
    return this.findOne({ _id: id });
  }
  /**
   * Find items by tags
   */
  async findByTags(tags: string[]) {
    return this.findAll({ tags: { $in: tags } });
  }

  /**
   * Find items with low stock
   */
  async findLowStock(threshold: number = 10) {
    return this.findAll({ quantity: { $lt: threshold } });
  }

  /**
   * Find items by price range
   */
  async findByPriceRange(minPrice: number, maxPrice: number) {
    return this.findAll({
      unitPrice: { $gte: minPrice, $lte: maxPrice },
    });
  }

  /**
   * Search items by name (case-insensitive)
   */
  async searchByName(searchTerm: string) {
    return this.findAll({
      name: { $regex: searchTerm, $options: 'i' },
    });
  }

  /**
   * Update item quantity (increment/decrement)
   */
  async updateQuantity(id: string, quantityChange: number) {
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
