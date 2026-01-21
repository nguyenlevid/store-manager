import { BaseRepository } from './BaseRepository';
import { User, UserDocument } from '@/models/User';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor() {
    super(User);
  }
  // ============================================
  // CUSTOM QUERIES
  // ============================================
  async createUser(userData: Partial<UserDocument>) {
    return this.create(userData);
  }

  async findById(id: string) {
    return this.findOne({ _id: id });
  }

  /**
   * Find users by queries
   */
  async findUsers(queries: any = {}) {
    return this.findAll(queries);
  }
}

export const userRepository = new UserRepository();
