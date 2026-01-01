import { Model, Document, QueryOptions } from 'mongoose';

/**
 * Base Repository with optimized lean queries and standard CRUD operations
 *
 * @template T - Mongoose Document type
 */
export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  // ============================================
  // READ OPERATIONS (Optimized with .lean())
  // ============================================

  /**
   * Find all documents matching the filter (returns plain objects)
   */
  async findAll(filter: any = {}, options: QueryOptions = {}): Promise<any[]> {
    return this.model.find(filter, null, options).lean().exec();
  }

  /**
   * Find one document matching the filter (returns plain object)
   */
  async findOne(filter: any): Promise<any | null> {
    return this.model.findOne(filter).lean().exec();
  }

  /**
   * Find document by ID (returns plain object)
   */
  async findById(id: string): Promise<any | null> {
    return this.model.findById(id).lean().exec();
  }

  /**
   * Count documents matching the filter
   */
  async count(filter: any = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  /**
   * Check if any document matches the filter
   */
  async exists(filter: any): Promise<boolean> {
    const count = await this.model.countDocuments(filter).limit(1).exec();
    return count > 0;
  }

  // ============================================
  // WRITE OPERATIONS
  // ============================================

  /**
   * Create a new document
   */
  async create(data: any): Promise<any> {
    return this.model.create(data);
  }

  /**
   * Create multiple documents
   */
  async createMany(data: any[]): Promise<any[]> {
    return this.model.insertMany(data);
  }

  /**
   * Update document by ID (returns updated plain object)
   */
  async updateById(
    id: string,
    updates: any,
    options: QueryOptions = {},
  ): Promise<any | null> {
    return this.model
      .findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
        ...options,
      })
      .lean()
      .exec();
  }

  /**
   * Update one document matching the filter
   */
  async updateOne(
    filter: any,
    updates: any,
    options: QueryOptions = {},
  ): Promise<any | null> {
    return this.model
      .findOneAndUpdate(filter, updates, {
        new: true,
        runValidators: true,
        ...options,
      })
      .lean()
      .exec();
  }

  /**
   * Update multiple documents
   */
  async updateMany(
    filter: any,
    updates: any,
  ): Promise<{ matchedCount: number; modifiedCount: number }> {
    const result = await this.model.updateMany(filter, updates).exec();
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  }

  /**
   * Delete document by ID
   */
  async deleteById(id: string): Promise<any | null> {
    return this.model.findByIdAndDelete(id).lean().exec();
  }

  /**
   * Delete one document matching the filter
   */
  async deleteOne(filter: any): Promise<any | null> {
    return this.model.findOneAndDelete(filter).lean().exec();
  }

  /**
   * Delete multiple documents
   */
  async deleteMany(filter: any): Promise<number> {
    const result = await this.model.deleteMany(filter).exec();
    return result.deletedCount;
  }

  // ============================================
  // PAGINATION
  // ============================================

  /**
   * Find documents with pagination
   */
  async findWithPagination(
    filter: any = {},
    page: number = 1,
    limit: number = 10,
    sort: any = { createdAt: -1 },
  ) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).lean().exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }
}
