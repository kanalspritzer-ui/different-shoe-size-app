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
  Picker,
} from 'react-native';
import { apiService } from '../services/api';
import { RegistrationData } from '../types';

type Props = {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
};

export const RegisterScreen: React.FC<Props> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    anrede: '',
    vorname: '',
    nachname: '',
    strasse: '',
    postleitzahl: '',
    ort: '',
    email: '',
    passwort: '',
    schuhgroesseLinks: '',
    schugroesseRechts: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = (): boolean => {
    if (
      !formData.anrede ||
      !formData.vorname ||
      !formData.nachname ||
      !formData.email ||
      !formData.passwort ||
      !formData.schuhgroesseLinks ||
      !formData.schugroesseRechts
    ) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle erforderlichen Felder aus');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await apiService.register(formData);
      setLoading(false);
      Alert.alert('Erfolg', 'Registrierung erfolgreich! Bitte melden Sie sich an.', [
        { text: 'OK', onPress: onRegisterSuccess },
      ]);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Registrierungsfehler', error.response?.data?.message || 'Fehler bei der Registrierung');
    }
  };

  const shoeSize = ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>DIFFERENT SHOE SIZE</Text>
      <Text style={styles.subtitle}>Registrierung</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Anrede:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.anrede}
            onValueChange={(value) => handleInputChange('anrede', value)}
            enabled={!loading}
          >
            <Picker.Item label="-- Bitte wählen --" value="" />
            <Picker.Item label="Herr" value="Herr" />
            <Picker.Item label="Frau" value="Frau" />
            <Picker.Item label="Divers" value="Divers" />
          </Picker>
        </View>

        <Text style={styles.label}>Vorname:</Text>
        <TextInput
          style={styles.input}
          placeholder="z.B. Max"
          value={formData.vorname}
          onChangeText={(value) => handleInputChange('vorname', value)}
          editable={!loading}
        />

        <Text style={styles.label}>Nachname:</Text>
        <TextInput
          style={styles.input}
          placeholder="z.B. Mustermann"
          value={formData.nachname}
          onChangeText={(value) => handleInputChange('nachname', value)}
          editable={!loading}
        />

        <Text style={styles.label}>Straße:</Text>
        <TextInput
          style={styles.input}
          placeholder="z.B. Musterstraße 123"
          value={formData.strasse}
          onChangeText={(value) => handleInputChange('strasse', value)}
          editable={!loading}
        />

        <Text style={styles.label}>Postleitzahl:</Text>
        <TextInput
          style={styles.input}
          placeholder="z.B. 12345"
          value={formData.postleitzahl}
          onChangeText={(value) => handleInputChange('postleitzahl', value)}
          editable={!loading}
        />

        <Text style={styles.label}>Ort:</Text>
        <TextInput
          style={styles.input}
          placeholder="z.B. Berlin"
          value={formData.ort}
          onChangeText={(value) => handleInputChange('ort', value)}
          editable={!loading}
        />

        <Text style={styles.label}>E-Mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="ihre@email.com"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          editable={!loading}
        />

        <Text style={styles.label}>Passwort:</Text>
        <TextInput
          style={styles.input}
          placeholder="Passwort"
          value={formData.passwort}
          onChangeText={(value) => handleInputChange('passwort', value)}
          secureTextEntry={true}
          editable={!loading}
        />

        <Text style={styles.label}>Schuhgröße Links:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.schuhgroesseLinks}
            onValueChange={(value) => handleInputChange('schuhgroesseLinks', value)}
            enabled={!loading}
          >
            <Picker.Item label="-- Wählen --" value="" />
            {shoeSize.map((size) => (
              <Picker.Item key={size} label={size} value={size} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Schuhgröße Rechts:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.schugroesseRechts}
            onValueChange={(value) => handleInputChange('schugroesseRechts', value)}
            enabled={!loading}
          >
            <Picker.Item label="-- Wählen --" value="" />
            {shoeSize.map((size) => (
              <Picker.Item key={size} label={size} value={size} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrieren</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToLogin} disabled={loading}>
          <Text style={styles.linkText}>
            Bereits registriert? <Text style={styles.linkBold}>Jetzt anmelden</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#0070f3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
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
