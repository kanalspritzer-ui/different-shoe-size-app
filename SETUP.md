# Setup-Anleitung: Android App mit bestehendem Backend verbinden

Diese Anleitung zeigt, wie Sie die Android-App mit Ihrem bestehendem Next.js-Backend verbinden.

## Schritt 1: Backend-URL ermitteln

### Option A: Lokal mit Android Emulator

Wenn Sie den Android Studio Emulator verwenden und das Backend lokal läuft:

```typescript
// src/services/api.ts
const API_BASE_URL = 'http://10.0.2.2:3000';
```

`10.0.2.2` ist die spezielle IP-Adresse für den Host-Computer aus dem Emulator-Kontext.

### Option B: Lokal mit physischem Gerät

Wenn Sie ein echtes Android-Gerät verwenden und das Backend auf Ihrem Computer läuft:

1. Öffnen Sie ein Terminal und führen Sie aus:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. Suchen Sie nach Ihrer lokalen IP-Adresse (meist `192.168.x.x`):
   ```typescript
   // src/services/api.ts
   const API_BASE_URL = 'http://192.168.1.100:3000';  // Ersetzen Sie 192.168.1.100 mit Ihrer IP
   ```

3. Stellen Sie sicher, dass Ihr Backend auf dieser IP erreichbar ist und nicht nur auf `localhost` läuft.

### Option C: Remote Server

Wenn Ihr Backend auf einem Remote-Server gehostet wird:

```typescript
// src/services/api.ts
const API_BASE_URL = 'https://your-domain.com:3000';  // Oder ohne :3000, falls Standard-Port
```

## Schritt 2: Backend-Server starten

```bash
cd ../web
npm run dev
```

Der Server sollte auf `http://localhost:3000` laufen.

## Schritt 3: CORS-Headers konfigurieren (nur für externe Requests nötig)

Wenn Sie vom physischen Gerät oder Remote zugreifen, fügen Sie CORS-Headers in `next.config.ts` ein:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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

export default nextConfig;
```

Dann speichern Sie und der Dev-Server lädt automatisch neu.

## Schritt 4: Android App konfigurieren

1. Öffnen Sie `src/services/api.ts`
2. Ändern Sie `API_BASE_URL` zu Ihrer Backend-URL (siehe Schritt 1)
3. Speichern Sie die Datei

## Schritt 5: App starten

```bash
cd different-shoe-size-app
npm run android
```

Die App wird im Emulator oder auf dem Gerät gestartet.

## Schritt 6: Testen

1. **Registrieren:** Geben Sie einen neuen Benutzer ein mit Schuhgrößen
2. **Anmelden:** Verwenden Sie die gleichen Anmeldedaten
3. **Dashboard:** Überprüfen Sie, dass die Schuhgrößen angezeigt werden
4. **Matches:** Die Match-Anzahl wird vom Backend berechnet

## Debugging: Netzwerkprobleme

### Problem: "Netzwerkverbindung abgelehnt"

```bash
# Überprüfen Sie, dass der Backend-Server läuft
netstat -an | grep 3000  # Windows: netstat -ano | findstr :3000
```

### Problem: "Timeout beim Verbinden"

Überprüfen Sie die API_BASE_URL in `src/services/api.ts`:
- Ist die IP-Adresse korrekt?
- Ist der Port korrekt (standardmäßig 3000)?
- Firewall blockiert den Zugriff? (Ports freigeben)

### Problem: "Response ist nicht JSON"

Überprüfen Sie in der Browser-Konsole, dass der Backend bei `/api/login`, `/api/auftraege` und `/api/matches` gültige JSON-Responses zurückgibt.

## Schritt 7: Optional - Backend-URL zur Laufzeit ändern

Sie können die Backend-URL auch zur Laufzeit ändern, ohne den Code zu bearbeiten:

```typescript
// In einem Settings-Screen oder Debug-Menu
import { apiService } from './src/services/api';

apiService.setBackendURL('http://new-ip:3000');
```

## Häufig gestellte Fragen

### F: Kann ich den Web-Frontend und die Android-App gleichzeitig verwenden?
A: Ja! Der Backend-Server kann mehrere Clients gleichzeitig bedienen.

### F: Wird mein Passwort verschlüsselt?
A: Aktuell nicht. In der Produktionsversion sollten Sie Passwörter mit Bcrypt hashen.

### F: Wie viele Matches kann das System verarbeiten?
A: Das hängt von Ihrer Datenbankinstanz ab. Mit PostgreSQL sollten Sie problemlos Millionen Benutzer handhaben können.

### F: Kann ich die App offline verwenden?
A: Begrenzt. Bereits angemeldete Benutzer bleiben angemeldet (gespeichert in AsyncStorage), aber Matches erfordern eine Netzwerkverbindung zum Backend.

## Nächste Schritte

1. Implementieren Sie Passwort-Hashing im Backend
2. Fügen Sie Profil-Bearbeitungs-Funktionen hinzu
3. Erweitern Sie die UI mit Animationen
4. Implementieren Sie Push-Notifications für neue Matches
5. Veröffentlichen Sie die App im Google Play Store
