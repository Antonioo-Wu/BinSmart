import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

export function QRCodeScreen({ navigation }) {
  const [showCamera, setShowCamera] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { saveSession, clearSession } = useUser();

  const handleBarCodeScanned = async ({ type, data }) => {
    setShowCamera(false);
    setIsProcessing(true);
    
    try {      
      console.log('QR Data recibido:', data);
      
      let qrData;
      try {
        qrData = JSON.parse(data);
        console.log('QR Data parseado:', qrData);
      } catch (parseError) {
        console.error('Error parsing QR data:', parseError);
        Alert.alert(
          "QR Inválido",
          `El código QR no tiene el formato correcto. Datos recibidos: ${data.substring(0, 100)}...`,
          [
            {
              text: "Intentar de nuevo",
              onPress: () => {
                setIsProcessing(false);
                setShowCamera(true);
              }
            }
          ]
        );
        return;
      }

      const { qrToken, sessionJwt, userId } = qrData;
      console.log('Datos extraídos del QR:', { qrToken, sessionJwt: sessionJwt ? 'presente' : 'ausente', userId });

      if (!qrToken || !sessionJwt || !userId) {
        Alert.alert(
          "QR Inválido", 
          `El código QR no contiene toda la información necesaria.\nToken: ${qrToken ? 'OK' : 'FALTA'}\nSesión: ${sessionJwt ? 'OK' : 'FALTA'}\nUsuario: ${userId ? 'OK' : 'FALTA'}`,
          [
            {
              text: "Intentar de nuevo",
              onPress: () => {
                setIsProcessing(false);
                setShowCamera(true);
              }
            }
          ]
        );
        return;
      }

      // Limpiar sesión anterior antes de guardar la nueva
      clearSession();
      saveSession(qrToken, sessionJwt, userId);
      
      Alert.alert(
        "¡Sesión Iniciada!",
        "Usuario autenticado correctamente.\nAhora puedes escanear residuos para ganar puntos.",
        [
          {
            text: "Continuar",
            onPress: () => navigation.replace('MainApp')
          }
        ]
      );
    } catch (error) {
      console.error('❌ Error procesando QR:', error);
      
      Alert.alert(
        "Error",
        "Ocurrió un error al procesar el código QR",
        [
          {
            text: "Intentar de nuevo",
            onPress: () => {
              setIsProcessing(false);
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
      setIsProcessing(false);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Necesitamos permiso de cámara para escanear códigos QR</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Otorgar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isProcessing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#37b859" />
        <Text style={[styles.text, { marginTop: 20, color: '#37b859' }]}>
          Procesando código QR...
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
      <Text style={styles.text}>Sin acceso a cámara</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    pointerEvents: 'box-none',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
    zIndex: 1,
    pointerEvents: 'auto',
  },
  scanArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
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
    pointerEvents: 'none',
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