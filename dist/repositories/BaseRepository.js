/**
 * Base Repository with optimized lean queries and standard CRUD operations
 *
 * @template T - Mongoose Document type
 */
export class BaseRepository {
  model;
  constructor(model) {
    this.model = model;
  }
  // ============================================
  // READ OPERATIONS (Optimized with .lean())
  // ============================================
  /**
   * Find all documents matching the filter (returns plain objects)
   */
  async findAll(filter = {}, options = {}) {
    return this.model.find(filter, null, options).lean().exec();
  }
  /**
   * Find one document matching the filter (returns plain object)
   */
  async findOne(filter) {
    return this.model.findOne(filter).lean().exec();
  }
  /**
   * Find document by ID (returns plain object)
   */
  async findById(id) {
    return this.model.findById(id).lean().exec();
  }
  /**
   * Count documents matching the filter
   */
  async count(filter = {}) {
    return this.model.countDocuments(filter).exec();
  }
  /**
   * Check if any document matches the filter
   */
  async exists(filter) {
    const count = await this.model.countDocuments(filter).limit(1).exec();
    return count > 0;
  }
  // ============================================
  // WRITE OPERATIONS
  // ============================================
  /**
   * Create a new document
   */
  async create(data) {
    return this.model.create(data);
  }
  /**
   * Create multiple documents
   */
  async createMany(data) {
    return this.model.insertMany(data);
  }
  /**
   * Update document by ID (returns updated plain object)
   */
  async updateById(id, updates, options = {}) {
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
  async updateOne(filter, updates, options = {}) {
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
  async updateMany(filter, updates) {
    const result = await this.model.updateMany(filter, updates).exec();
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  }
  /**
   * Delete document by ID
   */
  async deleteById(id) {
    return this.model.findByIdAndDelete(id).lean().exec();
  }
  /**
   * Delete one document matching the filter
   */
  async deleteOne(filter) {
    return this.model.findOneAndDelete(filter).lean().exec();
  }
  /**
   * Delete multiple documents
   */
  async deleteMany(filter) {
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
    filter = {},
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
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
