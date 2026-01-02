import { BaseRepository } from './BaseRepository';
import { StoreHouse, StoreHouseDocument } from '@/models/StoreHouse';

export class StoreHouseRepository extends BaseRepository<StoreHouseDocument> {
  constructor() {
    super(StoreHouse);
  }

  // ============================================
  // CUSTOM QUERIES
  // ============================================

  async createStoreHouse(storeHouseData: Partial<StoreHouseDocument>) {
    return this.create(storeHouseData);
  }

  async findById(id: string) {
    return this.findOne({ _id: id });
  }

  /**
   * Search storehouses by name (case-insensitive)
   */
  async searchByName(searchTerm: string) {
    return this.findAll({
      name: { $regex: searchTerm, $options: 'i' },
    });
  }

  async findStoreHouses(filter: any = {}) {
    return this.findAll(filter);
  }
}

// Export singleton instance
export const storeHouseRepository = new StoreHouseRepository();
