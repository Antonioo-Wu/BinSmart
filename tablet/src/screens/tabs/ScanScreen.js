import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, StatusBar, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { classifyImage, registrarEscaneo, asignarPuntos } from '../../services/api';
import { LoadingScreen } from './LoadingScreen';
import { useUser } from '../../context/UserContext';

export function ScanScreen({ navigation, route }) {
  const [showCamera, setShowCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState('front');
  const cameraRef = useRef(null);
  const { userId, isGuest } = useUser();

  const isGuestMode = route?.name === 'GuestScan' || isGuest;

  // Función para calcular puntos - siempre 100 puntos por escaneo
  const calculatePoints = (categoria, confianza) => {
    return 100; // Puntos fijos sin importar la categoría
  };

  const handleScanPress = async () => {
    if (!permission?.granted) {
      const permissionResult = await requestPermission();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permiso Requerido",
          "Necesitas otorgar permiso de cámara para usar esta función"
        );
        return;
      }
    }
    setShowCamera(true);
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      setShowCamera(false);
      setIsAnalyzing(true);

      try {        
        const formData = new FormData();
        formData.append('image', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg'
        });

        const res = await classifyImage(formData);
        const label = res.data[0].label;
        const confianza = res.data[0].confidences?.[0]?.confidence || 0;

        setIsAnalyzing(false);
        
        if (isGuestMode) {
          navigation.navigate('GuestScanResult', {
            imageUri: photo.uri,
            classification: label,
          });
        } else {
          if (userId) {
            // Registrar el escaneo en el historial
            registrarEscaneo(userId, label, confianza, photo.uri)
              .catch(err => console.error('Error guardando historial:', err));
            
            // Calcular y asignar puntos al usuario
            const puntosGanados = calculatePoints(label, confianza);
            
            asignarPuntos(userId, puntosGanados)
              .then(() => {
                Alert.alert(
                  "¡Puntos Ganados!",
                  `Has ganado ${puntosGanados} puntos por reciclar ${label}`,
                  [{ text: "¡Genial!" }]
                );
              })
              .catch(err => {
                console.error('Error asignando puntos:', err);
                Alert.alert(
                  "Error",
                  "No se pudieron asignar los puntos. Verifica tu conexión.",
                  [{ text: "OK" }]
                );
              });

            // Navegar con los puntos ganados
            navigation.navigate('ScanResult', {
              imageUri: photo.uri,
              classification: label,
              pointsEarned: puntosGanados,
            });
          } else {
            // Usuario sin sesión - no se asignan puntos
            Alert.alert(
              "Sin Usuario",
              "Para ganar puntos, primero debes escanear tu código QR de usuario",
              [{ text: "OK" }]
            );
            navigation.navigate('ScanResult', {
              imageUri: photo.uri,
              classification: label,
            });
          }
        }
      } catch (error) {
        console.error('Error clasificando imagen:', error);
        setIsAnalyzing(false);
        
        // Determinar el tipo de error
        let errorMessage = 'No se pudo clasificar la imagen.';
        if (error.message.includes('Network Error') || error.message.includes('timeout')) {
          errorMessage = 'Error de conexión. Verifica tu internet y que el servidor esté activo.';
        } else if (error.message.includes('404')) {
          errorMessage = 'Servicio de clasificación no encontrado.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Error interno del servidor.';
        }
        
        Alert.alert(
          'Error de Clasificación',
          `${errorMessage}\n\nDetalles técnicos: ${error.message}`,
          [
            {
              text: 'Reintentar',
              onPress: () => setShowCamera(true)
            },
            {
              text: 'Cancelar',
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error tomando foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return <LoadingScreen />;
  }

  if (showCamera) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={cameraType}
          />
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setCameraType(cameraType === 'front' ? 'back' : 'front')}
            >
              <Ionicons name="camera-reverse" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <Ionicons name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.scanCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="camera" size={50} color="#3498db" />
          </View>
          <Text style={styles.title}>Escanear Residuo</Text>
          <Text style={styles.subtitle}>Toma una foto para identificar el contenedor correcto</Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleScanPress}
          >
            <Ionicons name="camera-outline" size={24} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Escanear con Cámara</Text>
          </TouchableOpacity>
          <View style={styles.tipContainer}>
            <Ionicons name="bulb-outline" size={20} color="#3498db" />
            <Text style={styles.tipText}>Consejo: Coloca el objeto claramente en el centro</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 100
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
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
  },
  scanCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fbff',
    borderWidth: 1,
    borderColor: '#baedff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  tipText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 14,
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
  flipButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
    zIndex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 35,
    zIndex: 1,
  },
});