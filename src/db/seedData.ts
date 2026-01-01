/**
 * Seed Data for Local Database
 *
 * This file contains default/sample data for development and testing.
 */

import type {
  ItemDoc,
  PartnerDoc,
  TransactionDoc,
  ImportDoc,
  UserDoc,
} from './localDb';

// ============================================
// Predefined IDs for consistent relationships
// ============================================

// Item IDs
const ITEM_ID_APPLE = '6766a0001234567890abcdef';
const ITEM_ID_BANANA = '6766a0001234567890abcdf0';
const ITEM_ID_ORANGE_JUICE = '6766a0001234567890abcdf1';
const ITEM_ID_MILK = '6766a0001234567890abcdf2';

// Partner IDs
const PARTNER_ID_ABC_STORE = '6766b0001234567890abcdef';
const PARTNER_ID_XYZ_SUPERMARKET = '6766b0001234567890abcdf0';
const PARTNER_ID_FRESH_FARMS = '6766b0001234567890abcdf1';
const PARTNER_ID_GLOBAL_DIST = '6766b0001234567890abcdf2';

// User IDs
const USER_ID_ADMIN = '6766c0001234567890abcdef';
const USER_ID_JANE = '6766c0001234567890abcdf0';

// ============================================
// Sample Items
// ============================================

export const seedItems: Omit<ItemDoc, 'createdAt' | 'updatedAt'>[] = [
  {
    _id: ITEM_ID_APPLE,
    name: 'Apple',
    description: 'Fresh red apples',
    unitPrice: 2.5,
    origin: 'USA',
    tags: ['fruit', 'fresh'],
    quantity: 100,
    unit: 'kg',
    imageUrl: [],
  },
  {
    _id: ITEM_ID_BANANA,
    name: 'Banana',
    description: 'Organic bananas',
    unitPrice: 1.8,
    origin: 'Ecuador',
    tags: ['fruit', 'organic'],
    quantity: 150,
    unit: 'kg',
    imageUrl: [],
  },
  {
    _id: ITEM_ID_ORANGE_JUICE,
    name: 'Orange Juice',
    description: '100% fresh orange juice',
    unitPrice: 3.5,
    origin: 'Brazil',
    tags: ['beverage', 'juice'],
    quantity: 50,
    unit: 'liter',
    imageUrl: [],
  },
  {
    _id: ITEM_ID_MILK,
    name: 'Milk',
    description: 'Whole milk',
    unitPrice: 1.2,
    origin: 'Local',
    tags: ['dairy', 'fresh'],
    quantity: 200,
    unit: 'liter',
    imageUrl: [],
  },
];

// ============================================
// Sample Partners (Clients & Suppliers)
// ============================================

export const seedPartners: Omit<PartnerDoc, 'createdAt' | 'updatedAt'>[] = [
  {
    _id: PARTNER_ID_ABC_STORE,
    partnerType: 'client',
    partnerName: 'ABC Store',
    phoneNumber: '+1234567890',
    email: 'contact@abcstore.com',
    address: '123 Main St, New York, NY',
  },
  {
    _id: PARTNER_ID_XYZ_SUPERMARKET,
    partnerType: 'client',
    partnerName: 'XYZ Supermarket',
    phoneNumber: '+1234567891',
    email: 'info@xyzsupermarket.com',
    address: '456 Oak Ave, Los Angeles, CA',
  },
  {
    _id: PARTNER_ID_FRESH_FARMS,
    partnerType: 'supplier',
    partnerName: 'Fresh Farms Co.',
    phoneNumber: '+1234567892',
    email: 'sales@freshfarms.com',
    address: '789 Farm Road, Texas, TX',
  },
  {
    _id: PARTNER_ID_GLOBAL_DIST,
    partnerType: 'supplier',
    partnerName: 'Global Distributors Inc.',
    phoneNumber: '+1234567893',
    email: 'orders@globaldist.com',
    address: '321 Industry Blvd, Chicago, IL',
  },
];

// ============================================
// Sample Users
// ============================================

export const seedUsers: Omit<UserDoc, 'createdAt' | 'updatedAt'>[] = [
  {
    _id: USER_ID_ADMIN,
    name: 'John Admin',
    username: 'admin',
    email: 'admin@storemanager.com',
    password: 'hashed_password_123', // In real app, this should be bcrypt hashed
    phoneNumber: '+1234567894',
    birthDate: new Date('1990-01-01'),
    appRole: 'admin',
    accessRole: [],
  },
  {
    _id: USER_ID_JANE,
    name: 'Jane User',
    username: 'janeuser',
    email: 'jane@storemanager.com',
    password: 'hashed_password_456',
    phoneNumber: '+1234567895',
    birthDate: new Date('1995-05-15'),
    appRole: 'user',
    accessRole: [],
  },
];

// ============================================
// Sample Transactions (Sales to Clients)
// ============================================

export const seedTransactions: Omit<
  TransactionDoc,
  'createdAt' | 'updatedAt'
>[] = [
  {
    _id: '6766d0001234567890abcdef',
    clientId: PARTNER_ID_ABC_STORE,
    item: [
      {
        itemId: ITEM_ID_APPLE,
        quantity: 20,
        unitPrice: 2.5,
        totalPrice: 50,
      },
      {
        itemId: ITEM_ID_BANANA,
        quantity: 15,
        unitPrice: 1.8,
        totalPrice: 27,
      },
    ],
    totalPrice: 77,
    itemsDeliveredDate: new Date('2025-12-20'),
    paymentCompletedDate: new Date('2025-12-22'),
    status: 'paymentCompleted',
  },
  {
    _id: '6766d0001234567890abcdf0',
    clientId: PARTNER_ID_XYZ_SUPERMARKET,
    item: [
      {
        itemId: ITEM_ID_MILK,
        quantity: 50,
        unitPrice: 1.2,
        totalPrice: 60,
      },
      {
        itemId: ITEM_ID_ORANGE_JUICE,
        quantity: 10,
        unitPrice: 3.5,
        totalPrice: 35,
      },
    ],
    totalPrice: 95,
    itemsDeliveredDate: new Date('2025-12-21'),
    status: 'itemsDelivered',
  },
  {
    _id: '6766d0001234567890abcdf1',
    clientId: PARTNER_ID_ABC_STORE,
    item: [
      {
        itemId: ITEM_ID_BANANA,
        quantity: 25,
        unitPrice: 1.8,
        totalPrice: 45,
      },
    ],
    totalPrice: 45,
    status: 'pending',
  },
];

// ============================================
// Sample Imports (Purchases from Suppliers)
// ============================================

export const seedImports: Omit<ImportDoc, 'createdAt' | 'updatedAt'>[] = [
  {
    _id: '6766e0001234567890abcdef',
    supplierId: PARTNER_ID_FRESH_FARMS,
    item: [
      {
        itemId: ITEM_ID_APPLE,
        quantity: 100,
        unitPrice: 1.5,
        totalPrice: 150,
      },
      {
        itemId: ITEM_ID_BANANA,
        quantity: 150,
        unitPrice: 1.0,
        totalPrice: 150,
      },
    ],
    totalPrice: 300,
    status: 'done',
    completedDate: new Date('2025-12-15'),
  },
  {
    _id: '6766e0001234567890abcdf0',
    supplierId: PARTNER_ID_GLOBAL_DIST,
    item: [
      {
        itemId: ITEM_ID_MILK,
        quantity: 200,
        unitPrice: 0.8,
        totalPrice: 160,
      },
      {
        itemId: ITEM_ID_ORANGE_JUICE,
        quantity: 50,
        unitPrice: 2.0,
        totalPrice: 100,
      },
    ],
    totalPrice: 260,
    status: 'done',
    completedDate: new Date('2025-12-18'),
  },
  {
    _id: '6766e0001234567890abcdf1',
    supplierId: PARTNER_ID_FRESH_FARMS,
    item: [
      {
        itemId: ITEM_ID_APPLE,
        quantity: 50,
        unitPrice: 1.5,
        totalPrice: 75,
      },
    ],
    totalPrice: 75,
    status: 'pending',
  },
];
