import * as fs from 'fs';
import * as path from 'path';

// ============================================
// Type Definitions (matching Mongoose models)
// ============================================

export interface BaseDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemDoc extends BaseDocument {
  name: string;
  description?: string;
  unitPrice: number;
  origin?: string;
  tags: string[];
  quantity: number;
  unit: string;
  imageUrl: string[];
}

export type PartnerType = 'client' | 'supplier';

export interface PartnerDoc extends BaseDocument {
  partnerType: PartnerType;
  partnerName: string;
  phoneNumber: string;
  email?: string;
  address: string;
}

export type TransactionStatus =
  | 'pending'
  | 'itemsDelivered'
  | 'paymentCompleted'
  | 'cancelled';

export interface TransactionDoc extends BaseDocument {
  clientId: string;
  item: {
    itemId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalPrice: number;
  itemsDeliveredDate?: Date;
  paymentCompletedDate?: Date;
  status: TransactionStatus;
}

export type ImportStatus = 'pending' | 'done';

export interface ImportDoc extends BaseDocument {
  supplierId: string;
  item: {
    itemId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalPrice: number;
  status: ImportStatus;
  completedDate?: Date;
}

export type AppRole = 'dev' | 'admin' | 'user';

export interface UserDoc extends BaseDocument {
  name: string;
  username?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  birthDate: Date;
  business?: string;
  appRole: AppRole;
  accessRole: string[];
  resetPasswordToken?: string;
}

// ============================================
// Local Utility Functions
// ============================================

function generateLocalId(): string {
  // Generate a MongoDB-like ObjectId (24 hex characters)
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomPart = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join('');
  return timestamp + randomPart;
}

function localMatchesQuery<T>(doc: T, query: Partial<T>): boolean {
  for (const key in query) {
    const queryValue = query[key];
    const docValue = (doc as any)[key];

    if (Array.isArray(queryValue)) {
      // If query value is an array, check if doc value contains all items
      if (!Array.isArray(docValue)) return false;
      if (!queryValue.every((v) => docValue.includes(v))) return false;
    } else if (typeof queryValue === 'object' && queryValue !== null) {
      // Handle MongoDB-like operators ($in, $gt, etc.) - basic support
      const operators = queryValue as Record<string, any>;
      if ('$in' in operators) {
        if (!operators.$in.includes(docValue)) return false;
      }
      if ('$gt' in operators) {
        if (!(docValue > operators.$gt)) return false;
      }
      if ('$gte' in operators) {
        if (!(docValue >= operators.$gte)) return false;
      }
      if ('$lt' in operators) {
        if (!(docValue < operators.$lt)) return false;
      }
      if ('$lte' in operators) {
        if (!(docValue <= operators.$lte)) return false;
      }
      if ('$ne' in operators) {
        if (docValue === operators.$ne) return false;
      }
    } else {
      // Simple equality check
      if (docValue !== queryValue) return false;
    }
  }
  return true;
}

// ============================================
// LocalCollection Class (Mongoose-like API)
// ============================================

export class LocalCollection<T extends BaseDocument> {
  private filePath: string;
  private data: T[] = [];

  constructor(collectionName: string, dataDir: string) {
    this.filePath = path.join(dataDir, `local-${collectionName}.json`);
    this.load();
  }

  private load(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        // Convert date strings back to Date objects
        this.data = parsed.map((doc: any) => ({
          ...doc,
          createdAt: new Date(doc.createdAt),
          updatedAt: new Date(doc.updatedAt),
        }));
      } else {
        this.data = [];
        this.save();
      }
    } catch (error) {
      console.error(
        `[LocalDB] Error loading collection from ${this.filePath}:`,
        error,
      );
      this.data = [];
    }
  }

  private save(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error(
        `[LocalDB] Error saving collection to ${this.filePath}:`,
        error,
      );
    }
  }

  // ---- Mongoose-like Methods ----

  async find(query: Partial<T> = {}): Promise<T[]> {
    if (Object.keys(query).length === 0) {
      return [...this.data];
    }
    return this.data.filter((doc) => localMatchesQuery(doc, query));
  }

  async findOne(query: Partial<T>): Promise<T | null> {
    return this.data.find((doc) => localMatchesQuery(doc, query)) || null;
  }

  async findById(id: string): Promise<T | null> {
    return this.data.find((doc) => doc._id === id) || null;
  }

  async create(input: Omit<T, '_id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const now = new Date();
    const doc = {
      ...input,
      _id: generateLocalId(),
      createdAt: now,
      updatedAt: now,
    } as T;

    this.data.push(doc);
    this.save();
    return doc;
  }

  async insertMany(
    inputs: Omit<T, '_id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<T[]> {
    const now = new Date();
    const docs = inputs.map(
      (input) =>
        ({
          ...input,
          _id: generateLocalId(),
          createdAt: now,
          updatedAt: now,
        }) as T,
    );

    this.data.push(...docs);
    this.save();
    return docs;
  }

  async findByIdAndUpdate(
    id: string,
    update: Partial<Omit<T, '_id' | 'createdAt' | 'updatedAt'>>,
    options?: { new?: boolean },
  ): Promise<T | null> {
    const index = this.data.findIndex((doc) => doc._id === id);
    if (index === -1) return null;

    const oldDoc = this.data[index];
    const updatedDoc = {
      ...oldDoc,
      ...update,
      updatedAt: new Date(),
    };

    this.data[index] = updatedDoc;
    this.save();

    return options?.new !== false ? updatedDoc : oldDoc;
  }

  async findOneAndUpdate(
    query: Partial<T>,
    update: Partial<Omit<T, '_id' | 'createdAt' | 'updatedAt'>>,
    options?: { new?: boolean },
  ): Promise<T | null> {
    const doc = this.data.find((d) => localMatchesQuery(d, query));
    if (!doc) return null;

    return this.findByIdAndUpdate(doc._id, update, options);
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    const index = this.data.findIndex((doc) => doc._id === id);
    if (index === -1) return null;

    const [deleted] = this.data.splice(index, 1);
    this.save();
    return deleted;
  }

  async findOneAndDelete(query: Partial<T>): Promise<T | null> {
    const doc = this.data.find((d) => localMatchesQuery(d, query));
    if (!doc) return null;

    return this.findByIdAndDelete(doc._id);
  }

  async deleteMany(query: Partial<T> = {}): Promise<{ deletedCount: number }> {
    const toDelete = this.data.filter((doc) => localMatchesQuery(doc, query));
    const deletedCount = toDelete.length;

    this.data = this.data.filter((doc) => !localMatchesQuery(doc, query));
    this.save();

    return { deletedCount };
  }

  async countDocuments(query: Partial<T> = {}): Promise<number> {
    if (Object.keys(query).length === 0) {
      return this.data.length;
    }
    return this.data.filter((doc) => localMatchesQuery(doc, query)).length;
  }

  async exists(query: Partial<T>): Promise<boolean> {
    return this.data.some((doc) => localMatchesQuery(doc, query));
  }
}

// ============================================
// Local Database Instance
// ============================================

const LOCAL_DATA_DIR = path.join(process.cwd(), 'localData');

// Ensure data directory exists
if (!fs.existsSync(LOCAL_DATA_DIR)) {
  fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
}

export const localDb = {
  items: new LocalCollection<ItemDoc>('items', LOCAL_DATA_DIR),
  partners: new LocalCollection<PartnerDoc>('partners', LOCAL_DATA_DIR),
  transactions: new LocalCollection<TransactionDoc>(
    'transactions',
    LOCAL_DATA_DIR,
  ),
  imports: new LocalCollection<ImportDoc>('imports', LOCAL_DATA_DIR),
  users: new LocalCollection<UserDoc>('users', LOCAL_DATA_DIR),
};

export default localDb;
