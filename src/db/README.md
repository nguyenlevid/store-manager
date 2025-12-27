# Model Management Guide

This guide explains how to add new models or modify existing ones in the store-manager application.

## File Structure

```
src/
├── models/          # Mongoose schemas (for MongoDB)
│   ├── Item.ts
│   ├── Partner.ts
│   └── ...
└── db/
    ├── localDb.ts   # Local type definitions & validation
    ├── dbMaster.ts  # Unified exports
    ├── index.ts     # Main exports
    └── seedData.ts  # Sample data
```

---

## Adding a New Model

### Step 1: Create Mongoose Model

**File:** `src/models/Category.ts`

```typescript
import mongoose, { Schema, Document } from 'mongoose';

interface CategoryDocument extends Document {
  name: string;
  description?: string;
}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true },
);

export const Category = mongoose.model('Category', categorySchema);
```

### Step 2: Add Local Type Definition

**File:** `src/db/localDb.ts`

Add interface after other type definitions:

```typescript
export interface CategoryDoc extends BaseDocument {
  name: string;
  description?: string;
}
```

### Step 3: Add Validation Schema

**File:** `src/db/localDb.ts`

Add schema definition in validation section:

```typescript
const categorySchema: ValidationSchema = {
  name: { required: true, type: 'string', unique: true },
};
```

### Step 4: Add to LocalDB Instance

**File:** `src/db/localDb.ts`

Add to `localDb` export at bottom:

```typescript
export const localDb = {
  items: ...,
  partners: ...,
  categories: new LocalCollection<CategoryDoc>(
    'categories',
    LOCAL_DATA_DIR,
    categorySchema,
  ),
};
```

### Step 5: Export from dbMaster

**File:** `src/db/dbMaster.ts`

Add exports:

```typescript
export const Category = db.categories;

export type {
  CategoryDoc,
  // ... other types
} from './localDb';
```

### Step 6: Export from Index

**File:** `src/db/index.ts`

Add to main exports:

```typescript
export {
  Category,
  type CategoryDoc,
  // ... other exports
} from './dbMaster';
```

### Step 7: Add Seed Data (Optional)

**File:** `src/db/seedData.ts`

```typescript
const CATEGORY_ID_FRUITS = '6766f0001234567890abcdef';

export const seedCategories: Omit<CategoryDoc, 'createdAt' | 'updatedAt'>[] = [
  {
    _id: CATEGORY_ID_FRUITS,
    name: 'Fruits',
    description: 'Fresh fruits',
  },
];
```

Update `database.ts` to seed the new collection.

---

## Modifying Existing Models

### Adding a Field

**1. Update Mongoose Model**

```typescript
// src/models/Item.ts
status: {
  type: String,
  enum: ['active', 'discontinued'],
  default: 'active',
}
```

**2. Update Local Type**

```typescript
// src/db/localDb.ts
export interface ItemDoc extends BaseDocument {
  // ... existing fields
  status: 'active' | 'discontinued';
}
```

**3. Update Validation Schema**

```typescript
// src/db/localDb.ts
const itemSchema: ValidationSchema = {
  // ... existing rules
  status: { required: true, enum: ['active', 'discontinued'] },
};
```

**4. Update Seed Data**

```typescript
// src/db/seedData.ts
export const seedItems = [
  {
    name: 'Apple',
    status: 'active', // Add new field
    // ... other fields
  },
];
```

### Removing a Field

1. Remove from Mongoose model
2. Remove from LocalDB type definition
3. Remove from validation schema
4. Remove from seed data
5. Update any code that references the field

---

## Validation Rules Reference

| Rule             | Description                    | Example                             |
| ---------------- | ------------------------------ | ----------------------------------- |
| `required: true` | Field cannot be null/undefined | `name: { required: true }`          |
| `type: 'string'` | Must be a string               | `name: { type: 'string' }`          |
| `type: 'number'` | Must be a number               | `price: { type: 'number' }`         |
| `type: 'array'`  | Must be an array               | `tags: { type: 'array' }`           |
| `type: 'date'`   | Must be a Date object          | `birthDate: { type: 'date' }`       |
| `enum: [...]`    | Must be one of listed values   | `role: { enum: ['admin', 'user'] }` |
| `unique: true`   | No duplicates allowed          | `email: { unique: true }`           |

### Example Schema

```typescript
const productSchema: ValidationSchema = {
  name: { required: true, type: 'string' },
  price: { required: true, type: 'number' },
  category: { required: true, enum: ['A', 'B', 'C'] },
  email: { required: true, type: 'string', unique: true },
  tags: { required: true, type: 'array' },
};
```

---

## Usage Examples

### Import Models

```typescript
import { Item, Partner, Category } from './db';
// or
import { Item, Partner, Category } from './db/dbMaster';
```

### CRUD Operations

```typescript
// Create
const item = await Item.create({
  name: 'Apple',
  unitPrice: 2.5,
  quantity: 100,
  unit: 'kg',
  tags: ['fruit'],
  imageUrl: [],
});

// Find
const items = await Item.find({ tags: 'fruit' });
const item = await Item.findById('6766a0001234567890abcdef');

// Update
await Item.findByIdAndUpdate(id, { quantity: 50 });

// Delete
await Item.findByIdAndDelete(id);
```

### Error Handling

```typescript
import { ValidationError } from './db';

try {
  await Item.create({ name: 'Test' }); // Missing required fields
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation failed:', error.message);
  }
}
```

---

## Important Notes

1. **Keep types in sync**: Local types should match Mongoose models
2. **Run with seed**: Use `npm run dev:seed` to test with fresh data
3. **Validation applies**: Only in local mode (dev/test)
4. **Auto-routing**: Models automatically use local or MongoDB based on `NODE_ENV`

---

## Testing Your Changes

```bash
# Test with fresh seed data
npm run dev:seed

# Check validation works
# Try creating invalid data and verify errors are thrown

# Test CRUD operations
# Create, read, update, delete documents
```
