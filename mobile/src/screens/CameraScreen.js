import { useState } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import styles from '../styles/CameraScreen.styles';

export default function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  const takePicture = async () => {
    // TODO: Implementar la toma de foto con la nueva API
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
      <CameraView style={styles.camera} facing={facing}>
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