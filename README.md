# Different Shoe Size - Android App

Eine React Native Android-App für das "Different Shoe Size" Matching-System. Die App ermöglicht Benutzern, sich zu registrieren, sich anzumelden und ihre Schuhgröße-Matches zu sehen.

## Features

- ✅ Benutzerregistrierung
- ✅ Benutzer-Anmeldung mit Backend-Authentifizierung
- ✅ Dashboard mit Match-Anzeige
- ✅ Persistente Benutzerspeicherung (Offline-Support)
- ✅ Internet-basierte Backend-Kommunikation
- ✅ Responsive UI für Android-Geräte

## Voraussetzungen

- Node.js (v18+)
- npm oder yarn
- Android Studio (für Android-Emulator) oder physisches Android-Gerät
- Expo CLI: `npm install -g expo-cli`

## Installation

1. **Projekt-Verzeichnis betreten:**
   ```bash
   cd different-shoe-size-app
   ```

2. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

## Konfiguration

### Backend-URL festlegen

Die App benötigt die URL zu Ihrem Backend. Bearbeiten Sie die Datei `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://YOUR_BACKEND_URL:3000';
```

Ersetzen Sie `YOUR_BACKEND_URL` mit:
- **Lokal (Android Studio Emulator):** `http://10.0.2.2:3000`
- **Lokal (physisches Gerät):** `http://YOUR_COMPUTER_IP:3000` (z.B. `http://192.168.1.100:3000`)
- **Remote Server:** `https://your-domain.com:3000`

**Hinweis:** Das Backend muss unter der angegebenen URL erreichbar sein und die folgenden Endpoints bereitstellen:
- `POST /api/login` - Benutzer-Anmeldung
- `POST /api/auftraege` - Benutzer-Registrierung
- `POST /api/matches` - Match-Berechnung

## Ausführung

### Android Development Server starten

```bash
npm run android
```

Dies startet:
1. Einen lokalen Expo-Entwicklungsserver
2. Den Android-Emulator (falls nicht bereits laufend)
3. Ihre App im Emulator

### Web Development Server starten (optional)

```bash
npm run web
```

### Expo Go App mit QR-Code

Wenn Sie ein physisches Android-Gerät verwenden, können Sie auch QR-Code-basiertes Deployment verwenden:

```bash
npm start
```

Dann scannen Sie den QR-Code mit der **Expo Go**-App (verfügbar im Google Play Store).

## Projektstruktur

```
different-shoe-size-app/
├── src/
│   ├── screens/           # React Native Screens
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── DashboardScreen.tsx
│   ├── services/          # API Service Layer
│   │   └── api.ts
│   └── types/             # TypeScript Types
│       └── index.ts
├── App.tsx               # Hauptkomponente & Navigation
├── app.json              # Expo-Konfiguration
├── package.json          # Dependencies
└── README.md             # Dieses Dokument
```

## API-Integration

Die App kommuniziert mit dem Backend über folgende Endpoints:

### Login
```
POST /api/login
Body: { email: string, passwort: string }
Response: { message: string, benutzer: Benutzer }
```

### Registrierung
```
POST /api/auftraege
Body: RegistrationData (Vorname, Nachname, Email, Schuhgrößen, etc.)
Response: { id: number, email: string }
```

### Matches laden
```
POST /api/matches
Body: { id: number, schuhgroesseLinks: string, schugroesseRechts: string }
Response: { matchCount: number }
```

## Debugging

### Logs anzeigen
```bash
npm run android -- --verbose
```

### Developer Menu öffnen
- **Android Emulator:** `Ctrl + M` (Windows/Linux) oder `Cmd + M` (Mac)
- **Physisches Gerät:** Mit zwei Fingern von rechts nach links wischen

### AsyncStorage überprüfen
```bash
adb shell
run-as com.differentshoesizeapp
# Dann NavigateTo /data/data/com.differentshoesizeapp/files/RCTAsyncLocalStorage_V1
```

## Troubleshooting

### Problem: "Cannot connect to backend"
- **Lösung:** Überprüfen Sie die Backend-URL in `src/services/api.ts`
- Stellen Sie sicher, dass der Backend-Server läuft
- Überprüfen Sie die Netzwerkverbindung

### Problem: "npm install fails"
- **Lösung:** 
  ```bash
  rm -rf node_modules
  npm install
  ```

### Problem: "Emulator startet nicht"
- **Lösung:** Android Studio öffnen und Emulator manuell starten, dann `npm run android` ausführen

## Backend-Integration für Next.js

Wenn Sie das Backend über das `../web` Verzeichnis entwickeln, müssen Sie CORS aktivieren:

```typescript
// next.config.ts
export const nextConfig = {
  // ... andere Config
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};
```

## Deployment

### App für Release bauen (APK)
```bash
eas build --platform android --local
```

### App auf Google Play veröffentlichen
```bash
eas build --platform android
eas submit --platform android
```

(Erfordert `eas-cli` und Anmeldung bei https://expo.dev)

## Unterstützung

Für Fragen oder Probleme:
1. Überprüfen Sie die Expo-Dokumentation: https://docs.expo.dev
2. Überprüfen Sie React Native-Docs: https://reactnative.dev
3. Überprüfen Sie die Fehlerausgabe in der Konsole

## Lizenz

Proprietary - Different Shoe Size App
