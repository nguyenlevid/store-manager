# Repository Pattern Usage Guide

## Quick Start

```typescript
import { itemRepository, partnerRepository } from '@/db';

// Get all items (optimized with lean)
const items = await itemRepository.findAll();
for (const item of items) {
  console.log(item.name, item.unitPrice);
}

// Create a new item
const newItem = await itemRepository.create({
  name: 'Apple',
  unitPrice: 1.5,
  quantity: 100,
  unit: 'kg',
  tags: ['fruit', 'fresh'],
  imageUrl: [],
});

// Update an item
const updated = await itemRepository.updateById(id, { quantity: 150 });

// Delete an item
await itemRepository.deleteById(id);
```

## Base Repository Methods

All repositories inherit these methods:

### Read Operations (use `.lean()` - returns plain objects)

- `findAll(filter?, options?)` - Find all documents
- `findOne(filter)` - Find one document
- `findById(id)` - Find by ID
- `count(filter?)` - Count documents
- `exists(filter)` - Check if document exists
- `findWithPagination(filter?, page?, limit?, sort?)` - Paginated results

### Write Operations

- `create(data)` - Create one document
- `createMany(data[])` - Create multiple documents
- `updateById(id, updates)` - Update by ID
- `updateOne(filter, updates)` - Update one document
- `updateMany(filter, updates)` - Update multiple documents
- `deleteById(id)` - Delete by ID
- `deleteOne(filter)` - Delete one document
- `deleteMany(filter)` - Delete multiple documents

## Repository-Specific Methods

### ItemRepository

```typescript
// Find low stock items
const lowStock = await itemRepository.findLowStock(10);

// Search by name
const results = await itemRepository.searchByName('apple');

// Find by tags
const fruits = await itemRepository.findByTags(['fruit', 'organic']);

// Update quantity
await itemRepository.updateQuantity(id, -5); // Decrease by 5

// Get statistics
const stats = await itemRepository.getItemsWithStats();

// Get items grouped by tag
const grouped = await itemRepository.getItemsByTag();
```

### PartnerRepository

```typescript
// Find all clients
const clients = await partnerRepository.findAllClients();

// Find all suppliers
const suppliers = await partnerRepository.findAllSuppliers();

// Search by name
const results = await partnerRepository.searchByName('john');

// Find by email
const partner = await partnerRepository.findByEmail('john@example.com');

// Get statistics
const stats = await partnerRepository.getPartnerStats();
```

### TransactionRepository

```typescript
// Find by client
const transactions = await transactionRepository.findByClientId(clientId);

// Find pending transactions
const pending = await transactionRepository.findPending();

// Update status
await transactionRepository.updateStatus(id, 'paymentCompleted');

// Get transaction with details (populated)
const details = await transactionRepository.findByIdWithDetails(id);

// Get statistics
const stats = await transactionRepository.getTransactionStats();

// Get revenue by date range
const revenue = await transactionRepository.getRevenueByDateRange(
  new Date('2025-01-01'),
  new Date('2025-12-31'),
);

// Get top clients
const topClients = await transactionRepository.getTopClients(10);
```

### ImportRepository

```typescript
// Find by supplier
const imports = await importRepository.findBySupplierId(supplierId);

// Find pending imports
const pending = await importRepository.findPending();

// Mark as completed
await importRepository.markAsCompleted(id);

// Get import with details (populated)
const details = await importRepository.findByIdWithDetails(id);

// Get statistics
const stats = await importRepository.getImportStats();

// Get top suppliers
const topSuppliers = await importRepository.getTopSuppliers(10);
```

### UserRepository

```typescript
// Find by email
const user = await userRepository.findByEmail('user@example.com');

// Find all admins
const admins = await userRepository.findAllAdmins();

// Check if email exists
const exists = await userRepository.emailExists('test@example.com');

// Update password
await userRepository.updatePassword(id, hashedPassword);

// Get statistics
const stats = await userRepository.getUserStats();
```

## Pagination Example

```typescript
const result = await itemRepository.findWithPagination(
  { quantity: { $gt: 0 } }, // filter
  1, // page
  20, // limit
  { createdAt: -1 }, // sort
);

console.log(result.items); // Array of items
console.log(result.pagination);
// {
//   page: 1,
//   limit: 20,
//   total: 150,
//   totalPages: 8,
//   hasNext: true,
//   hasPrev: false
// }
```

## Performance Benefits

✅ All read operations use `.lean()` for 2-5x faster queries  
✅ Returns plain JavaScript objects (no Mongoose overhead)  
✅ Type-safe with TypeScript  
✅ Reusable, testable, maintainable  
✅ Easy to add custom business logic

## When to Use Models Directly

Use Mongoose models directly when you need:

- Custom middleware/hooks
- Virtual properties
- Instance methods
- Complex schema validation

```typescript
import { Item } from '@/db';

const item = await Item.findById(id); // Full Mongoose document
item.quantity = 100;
await item.save(); // Triggers middleware
```
