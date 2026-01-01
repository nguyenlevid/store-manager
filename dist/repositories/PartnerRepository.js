import { BaseRepository } from './BaseRepository.js';
import { Partner } from '../models/Partner.js';
export class PartnerRepository extends BaseRepository {
  constructor() {
    super(Partner);
  }
  // ============================================
  // CUSTOM QUERIES
  // ============================================
  /**
   * Find partners by type (client or supplier)
   */
  async findByType(partnerType) {
    return this.findAll({ partnerType });
  }
  /**
   * Find all clients
   */
  async findAllClients() {
    return this.findByType('client');
  }
  /**
   * Find all suppliers
   */
  async findAllSuppliers() {
    return this.findByType('supplier');
  }
  /**
   * Search partners by name (case-insensitive)
   */
  async searchByName(searchTerm) {
    return this.findAll({
      partnerName: { $regex: searchTerm, $options: 'i' },
    });
  }
  /**
   * Find partner by email
   */
  async findByEmail(email) {
    return this.findOne({ email });
  }
  /**
   * Find partner by phone number
   */
  async findByPhoneNumber(phoneNumber) {
    return this.findOne({ phoneNumber });
  }
  /**
   * Get partner statistics
   */
  async getPartnerStats() {
    return Partner.aggregate([
      {
        $group: {
          _id: '$partnerType',
          count: { $sum: 1 },
        },
      },
    ]);
  }
}
// Export singleton instance
export const partnerRepository = new PartnerRepository();
