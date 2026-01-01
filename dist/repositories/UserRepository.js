import { BaseRepository } from './BaseRepository.js';
import { User } from '../models/User.js';
export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  // ============================================
  // CUSTOM QUERIES
  // ============================================
  /**
   * Find user by email
   */
  async findByEmail(email) {
    return this.findOne({ email });
  }
  /**
   * Find user by username
   */
  async findByUsername(username) {
    return this.findOne({ username });
  }
  /**
   * Find users by app role
   */
  async findByRole(appRole) {
    return this.findAll({ appRole });
  }
  /**
   * Find all admins
   */
  async findAllAdmins() {
    return this.findByRole('admin');
  }
  /**
   * Find all developers
   */
  async findAllDevelopers() {
    return this.findByRole('dev');
  }
  /**
   * Check if email exists
   */
  async emailExists(email) {
    return this.exists({ email });
  }
  /**
   * Check if username exists
   */
  async usernameExists(username) {
    return this.exists({ username });
  }
  /**
   * Update user password (should be hashed before calling)
   */
  async updatePassword(id, hashedPassword) {
    return this.updateById(id, { password: hashedPassword });
  }
  /**
   * Set password reset token
   */
  async setResetToken(id, token) {
    return this.updateById(id, { resetPasswordToken: token });
  }
  /**
   * Clear password reset token
   */
  async clearResetToken(id) {
    return this.updateById(id, { $unset: { resetPasswordToken: '' } });
  }
  /**
   * Get user statistics
   */
  async getUserStats() {
    return User.aggregate([
      {
        $group: {
          _id: '$appRole',
          count: { $sum: 1 },
        },
      },
    ]);
  }
}
// Export singleton instance
export const userRepository = new UserRepository();
