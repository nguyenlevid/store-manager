import { BaseRepository } from './BaseRepository.js';
import { Import } from '../models/Import.js';
import mongoose from 'mongoose';
export class ImportRepository extends BaseRepository {
  constructor() {
    super(Import);
  }
  // ============================================
  // CUSTOM QUERIES
  // ============================================
  /**
   * Find imports by supplier ID
   */
  async findBySupplierId(supplierId) {
    return this.findAll({
      supplierId: new mongoose.Types.ObjectId(supplierId),
    });
  }
  /**
   * Find imports by status
   */
  async findByStatus(status) {
    return this.findAll({ status });
  }
  /**
   * Find pending imports
   */
  async findPending() {
    return this.findByStatus('pending');
  }
  /**
   * Find completed imports
   */
  async findCompleted() {
    return this.findByStatus('done');
  }
  /**
   * Find imports within date range
   */
  async findByDateRange(startDate, endDate) {
    return this.findAll({
      createdAt: { $gte: startDate, $lte: endDate },
    });
  }
  /**
   * Update import status to done
   */
  async markAsCompleted(id) {
    return this.updateById(id, {
      status: 'done',
      completedDate: new Date(),
    });
  }
  /**
   * Get import with supplier details
   */
  async findByIdWithSupplier(id) {
    return Import.findById(id).populate('supplierId').lean().exec();
  }
  /**
   * Get import with all details (supplier and items)
   */
  async findByIdWithDetails(id) {
    return Import.findById(id)
      .populate('supplierId')
      .populate('item.itemId')
      .lean()
      .exec();
  }
  /**
   * Get import statistics
   */
  async getImportStats() {
    return Import.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalCost: { $sum: '$totalPrice' },
        },
      },
    ]);
  }
  /**
   * Get total cost by date range
   */
  async getCostByDateRange(startDate, endDate) {
    return Import.aggregate([
      {
        $match: {
          completedDate: { $gte: startDate, $lte: endDate },
          status: 'done',
        },
      },
      {
        $group: {
          _id: null,
          totalCost: { $sum: '$totalPrice' },
          importCount: { $sum: 1 },
        },
      },
    ]);
  }
  /**
   * Get top suppliers by import volume
   */
  async getTopSuppliers(limit = 10) {
    return Import.aggregate([
      { $match: { status: 'done' } },
      {
        $group: {
          _id: '$supplierId',
          totalSpent: { $sum: '$totalPrice' },
          importCount: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'partners',
          localField: '_id',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      { $unwind: '$supplier' },
    ]);
  }
}
// Export singleton instance
export const importRepository = new ImportRepository();
