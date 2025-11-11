import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { validateQrToken } from '../services/api';

export function QRCodeScreen({ navigation }) {
  const [showCamera, setShowCamera] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { login } = useUser();

  const handleBarCodeScanned = async ({ type, data }) => {
    setShowCamera(false);
    setIsValidating(true);
    
    try {
      let qrData;
      try {
        qrData = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing QR data:', parseError);
        Alert.alert(
          "QR Inválido",
          "El código QR no tiene el formato correcto",
          [
            {
              text: "Intentar de nuevo",
              onPress: () => {
                setIsValidating(false);
                setShowCamera(true);
              }
            }
          ]
        );
        return;
      }

      const { qrToken, sessionJwt } = qrData;


      if (!qrToken || !sessionJwt) {
        Alert.alert(
          "QR Inválido",
          "El código QR no contiene la información necesaria",
          [
            {
              text: "Intentar de nuevo",
              onPress: () => {
                setIsValidating(false);
                setShowCamera(true);
              }
            }
          ]
        );
        return;
      }

      console.log('🔐 Validando QR con el servidor...');
      const response = await validateQrToken(qrToken, sessionJwt);

      if (response.success) {
        login(response.usuario);
        
        console.log('✅ Login exitoso:', response.usuario.nombre);
        
        Alert.alert(
          "¡Bienvenido!",
          `Hola ${response.usuario.nombre}!\nHas iniciado sesión exitosamente.`,
          [
            { 
              text: "Continuar", 
              onPress: () => navigation.replace('MainApp')
            }
          ]
        );
      }
    } catch (error) {
      console.error('❌ Error validando QR:', error);
      
      const errorMessage = error.response?.data?.error || 'Error al validar el código QR';
      
      Alert.alert(
        "Error de Autenticación",
        errorMessage,
        [
          {
            text: "Intentar de nuevo",
            onPress: () => {
              setIsValidating(false);
              setShowCamera(true);
            }
          },
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } finally {
      setIsValidating(false);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need camera permission to scan QR codes</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isValidating) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#37b859" />
        <Text style={[styles.text, { marginTop: 20, color: '#37b859' }]}>
          Validando código QR...
        </Text>
      </View>
    );
  }

  if (showCamera) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"]
            }}
          />
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.scanArea}>
              <View style={styles.scanFrame} />
            </View>
            <Text style={styles.scanText}>
              Escanea el código QR desde tu móvil
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No camera access</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
    zIndex: 1,
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#37b859',
    backgroundColor: 'transparent',
  },
  scanText: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#37b859',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});