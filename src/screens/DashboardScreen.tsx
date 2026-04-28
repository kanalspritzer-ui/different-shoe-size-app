import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { apiService } from '../services/api';
import { Benutzer } from '../types';

type Props = {
  benutzer: Benutzer;
  onLogout: () => void;
};

export const DashboardScreen: React.FC<Props> = ({ benutzer, onLogout }) => {
  const [matchCount, setMatchCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, [benutzer]);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMatches(
        benutzer.id,
        benutzer.schuhgroesseLinks,
        benutzer.schugroesseRechts
      );
      setMatchCount(response.matchCount || 0);
    } catch (error) {
      console.error('Fehler beim Laden der Matches:', error);
      Alert.alert('Fehler', 'Fehler beim Laden der Matches');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Abmelden', 'Möchten Sie sich wirklich abmelden?', [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Abmelden',
        onPress: async () => {
          await apiService.logout();
          onLogout();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0070f3" />
        <Text style={styles.loadingText}>Wird geladen...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Online Shop</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Abmelden</Text>
        </TouchableOpacity>
      </View>

      {/* Willkommen */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>
          Willkommen, {benutzer.vorname} {benutzer.nachname}!
        </Text>
        <Text style={styles.emailText}>E-Mail: {benutzer.email}</Text>
      </View>

      {/* Matches Box */}
      <View style={styles.matchesBox}>
        <Text style={styles.matchesTitle}>Deine Matches</Text>
        <Text style={styles.matchesCount}>{matchCount}</Text>
        <Text style={styles.matchesDescription}>
          {matchCount === 0 && 'Du hast noch keine Matches. Vielleicht findest du bald jemanden!'}
          {matchCount === 1 && 'Du hast 1 Match! 🎉'}
          {matchCount > 1 && `Du hast ${matchCount} Matches! 🎉`}
        </Text>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Wie funktioniert das?</Text>
        <Text style={styles.infoText}>
          Ein Match entsteht, wenn deine Schuhgrößen perfekt zu jemandem anderem passen:
        </Text>
        <Text style={styles.infoBullet}>
          • <Text style={styles.infoBulletBold}>Deine Schuhgröße Links</Text> muss gleich der Schuhgröße Rechts der anderen Person sein
        </Text>
        <Text style={styles.infoBullet}>
          • <Text style={styles.infoBulletBold}>Deine Schuhgröße Rechts</Text> muss gleich der Schuhgröße Links der anderen Person sein
        </Text>
        <Text style={styles.infoExample}>
          Beispiel: Deine Größen sind 42 (links) und 43 (rechts). Ein Match für dich wäre jemand mit 43 (links) und 42 (rechts).
        </Text>
      </View>

      {/* Schuhgrößen Box */}
      <View style={styles.shoeSizesBox}>
        <Text style={styles.shoeSizesTitle}>Deine Schuhgrößen</Text>
        <View style={styles.shoeSizesContent}>
          <View style={styles.shoeSizeItem}>
            <Text style={styles.shoeSizeLabel}>Schuhgröße Links:</Text>
            <Text style={styles.shoeSizeValue}>
              {benutzer.schuhgroesseLinks || '-'}
            </Text>
          </View>
          <View style={styles.shoeSizeItem}>
            <Text style={styles.shoeSizeLabel}>Schuhgröße Rechts:</Text>
            <Text style={styles.shoeSizeValue}>
              {benutzer.schugroesseRechts || '-'}
            </Text>
          </View>
        </View>
      </View>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={loadMatches}>
        <Text style={styles.refreshButtonText}>Matches aktualisieren</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  emailText: {
    fontSize: 14,
    color: '#666',
  },
  matchesBox: {
    backgroundColor: '#f0f8ff',
    borderWidth: 2,
    borderColor: '#0070f3',
    borderRadius: 8,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  matchesTitle: {
    fontSize: 16,
    color: '#0070f3',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  matchesCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0070f3',
    marginBottom: 10,
  },
  matchesDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  infoBullet: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  infoBulletBold: {
    fontWeight: 'bold',
  },
  infoExample: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
    fontStyle: 'italic',
  },
  shoeSizesBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  shoeSizesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  shoeSizesContent: {
    flexDirection: 'row',
    gap: 20,
  },
  shoeSizeItem: {
    flex: 1,
  },
  shoeSizeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  shoeSizeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0070f3',
  },
  refreshButton: {
    backgroundColor: '#0070f3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
