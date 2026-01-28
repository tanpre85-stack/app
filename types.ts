
export enum TaskStatus {
  OPEN = 'OPEN',
  PENDING_CUSTOMER_DEPOSIT = 'PENDING_CUSTOMER_DEPOSIT',
  WAITING_FOR_TECH_DEPOSIT = 'WAITING_FOR_TECH_DEPOSIT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DISPUTED = 'DISPUTED'
}

export interface Technician {
  id: string;
  name: string;
  rating: number;
  completedTasks: number;
  phone?: string;
  isVerified?: boolean;
}

export interface Offer {
  id: string;
  techId: string;
  techName: string;
  price: number;
  arrivalTime: string;
  techRating: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: string;
  status: TaskStatus;
  depositAmount: number;
  customerName: string;
  createdAt: string;
  images?: string[];
  selectedOffer?: Offer;
  technician?: Technician;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: string;
  provider: string;
  rating: number;
  reviews: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number | 'FREE';
  type: 'GIFT' | 'LIQUIDATION';
  location: string;
  image: string;
  ownerName: string;
  createdAt: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  type: 'PROMO' | 'TIPS' | 'NEWS';
  image: string;
  date: string;
  badge?: string;
}

export interface TenderItem {
  id: string;
  title: string;
  category: 'CONSTRUCTION' | 'INTERIOR' | 'RENOVATION' | 'MAINTENANCE';
  estimatedBudget: string;
  location: string;
  duration: string;
  description: string;
  posterName: string;
  isVerified: boolean;
  createdAt: string;
}

export type ViewMode = 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';

/**
 * Fix: Added missing Transaction interface used in WalletManagement.tsx
 */
export interface Transaction {
  id: string;
  type: 'REFUND' | 'PAYMENT' | 'DEPOSIT';
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  date: string;
  description: string;
}

/**
 * Fix: Added missing BankAccount interface used in WalletManagement.tsx
 */
export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  logo?: string;
}
