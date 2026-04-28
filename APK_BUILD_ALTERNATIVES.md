# APK Build Guide - Alternative Methode

Da die Gradle-Build auf Windows kompliziert sein kann, hier sind die empfohlenen Alternativen:

## Option 1: Expo Cloud Build (Empfohlen)

```bash
cd different-shoe-size-app

# Mit Git initialisieren (falls noch nicht geschehen)
git init
git add .
git commit -m "Initial commit"

# Mit Expo anmelden
eas login

# APK bauen (cloud)
eas build --platform android
```

Dies baut die APK in der Expo Cloud und lädt sie herunter.

## Option 2: Android Studio GUI (Einfachste Methode)

1. **Öffnen Sie Android Studio**
2. **"Open Project" → `C:\Users\kanal\.continue\dss-app\different-shoe-size-app\android`**
3. **Warten Sie auf Gradle Sync**
4. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
5. **APK wird hier gespeichert:** `android/app/build/outputs/apk/debug/app-debug.apk`

## Option 3: Docker (Vollautomatisch)

Installieren Sie Docker und führen aus:

```bash
docker run --rm -v /path/to/different-shoe-size-app:/app \
  circleci/android:latest \
  ./gradlew -p /app/android assembleDebug
```

## Option 4: WSL2 (Windows Subsystem for Linux)

```bash
# In WSL2 Terminal
cd /mnt/c/Users/kanal/.continue/dss-app/different-shoe-size-app/android
./gradlew assembleDebug
```

## APK Standort nach erfolgreichem Build

```
different-shoe-size-app/android/app/build/outputs/apk/debug/app-debug.apk
```

## Schnelltest ohne Build

Sie können die App auch mit Expo Entwicklungsserver testen:

```bash
npm start
# Dann Expo Go App auf Android-Gerät öffnen und QR-Code scannen
```

## Empfehlung

Verwenden Sie **Option 2 (Android Studio GUI)** - das ist am sichersten und einfachsten auf Windows!
