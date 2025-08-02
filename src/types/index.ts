// Shared TypeScript types for PUABO OS v2.0.0

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'creator' | 'viewer';
  avatar?: string;
  createdAt: string;
  profile: UserProfile;
}

export interface UserProfile {
  displayName: string;
  bio?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
  stats: {
    totalStreams: number;
    totalRevenue: number;
    followers: number;
  };
}

export interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface StreamContent {
  id: string;
  title: string;
  type: 'audio' | 'video';
  url: string;
  thumbnail?: string;
  duration: number;
  views: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'revenue' | 'payout' | 'subscription' | 'loan';
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
  amount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  requiredRole?: User['role'][];
  isEnabled: boolean;
}