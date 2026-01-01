import { BaseRepository } from './BaseRepository.js';
import { Transaction } from '../models/Transaction.js';
import mongoose from 'mongoose';
export class TransactionRepository extends BaseRepository {
  constructor() {
    super(Transaction);
  }
  // ============================================
  // CUSTOM QUERIES
  // ============================================
  /**
   * Find transactions by client ID
   */
  async findByClientId(clientId) {
    return this.findAll({ clientId: new mongoose.Types.ObjectId(clientId) });
  }
  /**
   * Find transactions by status
   */
  async findByStatus(status) {
    return this.findAll({ status });
  }
  /**
   * Find pending transactions
   */
  async findPending() {
    return this.findByStatus('pending');
  }
  /**
   * Find completed transactions
   */
  async findCompleted() {
    return this.findByStatus('paymentCompleted');
  }
  /**
   * Find transactions within date range
   */
  async findByDateRange(startDate, endDate) {
    return this.findAll({
      createdAt: { $gte: startDate, $lte: endDate },
    });
  }
  /**
   * Update transaction status
   */
  async updateStatus(id, status) {
    const updates = { status };
    if (status === 'itemsDelivered') {
      updates.itemsDeliveredDate = new Date();
    } else if (status === 'paymentCompleted') {
      updates.paymentCompletedDate = new Date();
    }
    return this.updateById(id, updates);
  }
  /**
   * Get transaction with client details
   */
  async findByIdWithClient(id) {
    return Transaction.findById(id).populate('clientId').lean().exec();
  }
  /**
   * Get transaction with all details (client and items)
   */
  async findByIdWithDetails(id) {
    return Transaction.findById(id)
      .populate('clientId')
      .populate('item.itemId')
      .lean()
      .exec();
  }
  /**
   * Get transaction statistics
   */
  async getTransactionStats() {
    return Transaction.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);
  }
  /**
   * Get revenue by date range
   */
  async getRevenueByDateRange(startDate, endDate) {
    return Transaction.aggregate([
      {
        $match: {
          paymentCompletedDate: { $gte: startDate, $lte: endDate },
          status: 'paymentCompleted',
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          transactionCount: { $sum: 1 },
        },
      },
    ]);
  }
  /**
   * Get top clients by revenue
   */
  async getTopClients(limit = 10) {
    return Transaction.aggregate([
      { $match: { status: 'paymentCompleted' } },
      {
        $group: {
          _id: '$clientId',
          totalSpent: { $sum: '$totalPrice' },
          transactionCount: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'partners',
          localField: '_id',
          foreignField: '_id',
          as: 'client',
        },
      },
      { $unwind: '$client' },
    ]);
  }
}
// Export singleton instance
export const transactionRepository = new TransactionRepository();
