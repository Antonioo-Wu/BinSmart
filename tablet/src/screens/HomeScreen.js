import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

export function HomeScreen({ navigation }) {
  const { loginAsGuest, userId, logout, sessionActive } = useUser();

  const handleGuestMode = () => {
    loginAsGuest();
    navigation.navigate('GuestScan');
  };

  const handleLogout = () => {
    logout();
    // Navegar al HomeScreen para mostrar las opciones de login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    
    // Mostrar confirmación de logout
    Alert.alert(
      "Sesión Cerrada",
      "La sesión se ha cerrado correctamente. Ahora puedes escanear un nuevo código QR para iniciar sesión con otro usuario.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Bienvenido a BinSmart</Text>
        {userId && sessionActive ? (
          <>
            <Text style={[styles.subtitle, styles.loggedIn]}>
              ✓ Usuario autenticado - Listo para ganar puntos
            </Text>
            <Text style={styles.userInfo}>
              ID de Usuario: {userId.substring(0, 8)}...
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <FontAwesome6 name="sign-out-alt" size={24} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
              <Text style={styles.buttonSubtext}>Cambiar usuario o usar modo invitado</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Selecciona tu modo de acceso para comenzar</Text>
          </>
        )}
        {!userId && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleGuestMode}
            >
              <FontAwesome6 name="user" size={24} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Modo Invitado</Text>
              <Text style={styles.buttonSubtext}>Escaneo rápido sin iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={() => navigation.navigate('QRScanner')}
            >
              <FontAwesome6 name="qrcode" size={24} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Usuario Registrado</Text>
              <Text style={styles.buttonSubtext}>Escanea QR para acceder a todas las funciones</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 40,
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
  logoutButton: {
    backgroundColor: '#e74c3c',
    marginBottom: 20,
  },
  loggedIn: {
    color: '#37b859',
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
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
