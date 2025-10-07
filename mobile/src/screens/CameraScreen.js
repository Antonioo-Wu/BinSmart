import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import styles from '../styles/CameraScreen.styles';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'permitido');
      console.log('hola');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      console.log('Foto tomada:', photo.uri);
      navigation.navigate('Resultado', { photoUri: photo.uri });
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Solicitando permiso de cámara...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No hay acceso a la cámara</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={ref => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
          >
            <Text style={styles.text}>Capturar</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}