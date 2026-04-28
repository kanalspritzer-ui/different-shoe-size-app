/**
 * Umgebungskonfiguration für verschiedene Szenarien
 * 
 * Setzen Sie die aktive Umgebung in src/services/api.ts:
 * import { config } from './config';
 * const API_BASE_URL = config[ENV].API_BASE_URL;
 */

export type Environment = 'emulator' | 'local-device' | 'production';

interface Config {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  DEBUG: boolean;
}

export const config: Record<Environment, Config> = {
  // Für Android Studio Emulator (localhost der App läuft auf 10.0.2.2 vom Host)
  emulator: {
    API_BASE_URL: 'http://10.0.2.2:3000',
    API_TIMEOUT: 10000,
    DEBUG: true,
  },

  // Für physisches Android-Gerät im gleichen Netzwerk
  // Ersetzen Sie die IP mit Ihrer Computer-IP
  'local-device': {
    API_BASE_URL: 'http://192.168.1.100:3000',
    API_TIMEOUT: 10000,
    DEBUG: true,
  },

  // Für Produktionsserver
  production: {
    API_BASE_URL: 'https://api.different-shoe-size.de',
    API_TIMEOUT: 10000,
    DEBUG: false,
  },
};

/**
 * Automatische Umgebungserkennung
 */
export function detectEnvironment(): Environment {
  // Sie können hier Logik hinzufügen zur automatischen Erkennung
  // Für jetzt: manuell setzen
  return 'emulator';
}
