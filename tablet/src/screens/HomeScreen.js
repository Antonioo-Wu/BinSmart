import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BinSmart</Text>
      <Text style={styles.subtitle}>Select your access mode to begin</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GuestScan')}
        >
          <FontAwesome6 name="user" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Guest Mode</Text>
          <Text style={styles.buttonSubtext}>Quick scan without login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('QRScanner')}
        >
          <FontAwesome6 name="qrcode" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Registered User</Text>
          <Text style={styles.buttonSubtext}>Scan QR to access full features</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: '#37b859',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  buttonIcon: {
    marginBottom: 5,
  },
});
