/**
 * Seed Data for Local Database
 *
 * This file contains default/sample data for development and testing.
 */

import type {
  LocalItemDoc,
  LocalPartnerDoc,
  LocalTransactionDoc,
  LocalImportDoc,
  LocalUserDoc,
} from './localDb';

// Sample Items
export const seedItems: Omit<
  LocalItemDoc,
  '_id' | 'createdAt' | 'updatedAt'
>[] = [
  {
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

// Sample Partners (Clients & Suppliers)
export const seedPartners: Omit<
  LocalPartnerDoc,
  '_id' | 'createdAt' | 'updatedAt'
>[] = [
  {
    partnerType: 'client',
    partnerName: 'ABC Store',
    phoneNumber: '+1234567890',
    email: 'contact@abcstore.com',
    address: '123 Main St, New York, NY',
  },
  {
    partnerType: 'client',
    partnerName: 'XYZ Supermarket',
    phoneNumber: '+1234567891',
    email: 'info@xyzsupermarket.com',
    address: '456 Oak Ave, Los Angeles, CA',
  },
  {
    partnerType: 'supplier',
    partnerName: 'Fresh Farms Co.',
    phoneNumber: '+1234567892',
    email: 'sales@freshfarms.com',
    address: '789 Farm Road, Texas, TX',
  },
  {
    partnerType: 'supplier',
    partnerName: 'Global Distributors Inc.',
    phoneNumber: '+1234567893',
    email: 'orders@globaldist.com',
    address: '321 Industry Blvd, Chicago, IL',
  },
];

// Sample Users
export const seedUsers: Omit<
  LocalUserDoc,
  '_id' | 'createdAt' | 'updatedAt'
>[] = [
  {
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

// Transactions and Imports will be empty by default
// (they'll be created as users interact with the system)
export const seedTransactions: Omit<
  LocalTransactionDoc,
  '_id' | 'createdAt' | 'updatedAt'
>[] = [];
export const seedImports: Omit<
  LocalImportDoc,
  '_id' | 'createdAt' | 'updatedAt'
>[] = [];
