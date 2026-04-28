import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegistrationData, Benutzer, LoginResponse, MatchResponse } from '../types';

// Change this to your backend URL
const API_BASE_URL = 'http://YOUR_BACKEND_URL:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Login
  async login(email: string, passwort: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/api/login', {
        email,
        passwort,
      });
      
      // Save user to AsyncStorage
      if (response.data.benutzer) {
        await AsyncStorage.setItem('benutzer', JSON.stringify(response.data.benutzer));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register
  async register(data: RegistrationData): Promise<{ id: number; email: string }> {
    try {
      const response = await api.post('/api/auftraege', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get Matches
  async getMatches(
    id: number,
    schuhgroesseLinks: string,
    schugroesseRechts: string
  ): Promise<MatchResponse> {
    try {
      const response = await api.post<MatchResponse>('/api/matches', {
        id,
        schuhgroesseLinks,
        schugroesseRechts,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get stored user
  async getStoredUser(): Promise<Benutzer | null> {
    try {
      const userData = await AsyncStorage.getItem('benutzer');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('benutzer');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },

  // Update backend URL (call this with your actual backend URL)
  setBackendURL(url: string): void {
    api.defaults.baseURL = url;
  },
};
