import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { apiService } from '../services/api';

type Props = {
  onLoginSuccess: (user: any) => void;
  onNavigateToRegister: () => void;
};

export const LoginScreen: React.FC<Props> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [passwort, setPasswort] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !passwort) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle Felder aus');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.login(email, passwort);
      setLoading(false);
      onLoginSuccess(response.benutzer);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Anmeldefehler', error.response?.data?.message || 'Fehler beim Anmelden');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>DIFFERENT SHOE SIZE</Text>
      <Text style={styles.subtitle}>Anmelden</Text>

      <View style={styles.form}>
        <Text style={styles.label}>E-Mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="ihre@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
        />

        <Text style={styles.label}>Passwort:</Text>
        <TextInput
          style={styles.input}
          placeholder="Passwort"
          value={passwort}
          onChangeText={setPasswort}
          secureTextEntry={true}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Anmelden</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToRegister} disabled={loading}>
          <Text style={styles.linkText}>
            Noch kein Konto? <Text style={styles.linkBold}>Jetzt registrieren</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#0070f3',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#0070f3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  linkBold: {
    color: '#0070f3',
    fontWeight: 'bold',
  },
});
