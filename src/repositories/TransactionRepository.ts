import { BaseRepository } from './BaseRepository';
import { Transaction, TransactionDocument } from '@/models/Transaction';

export class TransactionRepository extends BaseRepository<TransactionDocument> {
  constructor() {
    super(Transaction);
  }

  // ============================================
  // CUSTOM QUERIES
  // ============================================

  async createTransaction(transactionData: Partial<TransactionDocument>) {
    return this.create(transactionData);
  }

  async findById(id: string) {
    return this.findOne({ _id: id });
  }

  /**
   * Find transactions by queries
   */

  async findTransactions(queries: any = {}) {
    return this.findAll(queries);
  }
}

export const transactionRepository = new TransactionRepository();
