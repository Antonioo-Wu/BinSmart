import { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import styles from '../styles/CameraScreen.styles';
import api from '../services/api';

export default function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      // Enviar la foto
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg'
        });

        const response = await api.post('/classification/classify', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigation.navigate('ScanResult', { 
          imageUri: photo.uri,
          classification: response.data 
        });
      } catch (error) {
        Alert.alert('Error', 'No se pudo clasificar la imagen');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  if (!permission) {
    return <View style={styles.container}><Text>Solicitando permiso de cámara...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para usar la cámara</Text>
        <Button onPress={requestPermission} title="Dar permiso" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
          >
            <Text style={styles.text}>Capturar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.text}>Voltear cámara</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}