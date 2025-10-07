import { View, Text, Image, StyleSheet } from 'react-native';

export default function ScanResultScreen({ route }) {
  const { photoUri } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado del Escaneo</Text>
      <Image 
        source={{ uri: photoUri }} 
        style={styles.image}
      />
      <Text style={styles.result}>Analizando residuo...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});