import { supabase } from '../lib/supabase';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials) {
    try {
      // For demo purposes, create a mock user based on username
      const user = {
        id: '1',
        username: credentials.username,
        email: `${credentials.username}@puabo.com`,
        avatar: '/placeholder.svg',
        role: credentials.username === 'admin' ? 'admin' : 'creator',
        profile: {
          displayName: credentials.username,
          bio: 'PUABO Creator',
          stats: {
            totalStreams: Math.floor(Math.random() * 100000),
            totalRevenue: Math.floor(Math.random() * 10000),
            followers: Math.floor(Math.random() * 5000)
          }
        }
      };

      return { success: true, user };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  }

  static async register(data: RegisterData) {
    try {
      // Mock registration
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  }

  static async logout() {
    try {
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  }
}