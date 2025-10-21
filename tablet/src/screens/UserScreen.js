import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Usuario Registrado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    color: '#2c3e50',
  },
});
