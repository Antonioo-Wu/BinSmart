import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BinSmart</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Guest')}
        >
          <Text style={styles.buttonText}>Continuar como Invitado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('User')}
        >
          <Text style={styles.buttonText}>Usuario Registrado</Text>
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
    marginBottom: 40,
    color: '#2c3e50',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
