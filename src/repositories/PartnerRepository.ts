import { BaseRepository } from './BaseRepository';
import { Partner, PartnerDocument } from '@/models/Partner';

export class PartnerRepository extends BaseRepository<PartnerDocument> {
  constructor() {
    super(Partner);
  }
  // ============================================
  // CUSTOM QUERIES
  // ============================================

  async createPartner(partnerData: Partial<PartnerDocument>) {
    return this.create(partnerData);
  }

  async createPartners(partnersData: [Partial<PartnerDocument>]) {
    return this.createMany(partnersData);
  }

  async findById(id: string) {
    return this.findOne({ _id: id });
  }

  async findPartners(queries: any = {}) {
    return this.findAll(queries);
  }
}

export const partnerRepository = new PartnerRepository();
