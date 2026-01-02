import { BaseRepository } from './BaseRepository';
import { Business, BusinessDocument } from '@/models/Business';

export class BusinessRepository extends BaseRepository<BusinessDocument> {
  constructor() {
    super(Business);
  }

  // ============================================
  // CUSTOM QUERIES
  // ============================================

  async createBusiness(businessData: Partial<BusinessDocument>) {
    return this.create(businessData);
  }

  async findById(id: string) {
    return this.findOne({ _id: id });
  }

  /**
   * Search businesses by name (case-insensitive)
   */
  async searchByName(searchTerm: string) {
    return this.findAll({
      name: { $regex: searchTerm, $options: 'i' },
    });
  }
}

// Export singleton instance
export const businessRepository = new BusinessRepository();
