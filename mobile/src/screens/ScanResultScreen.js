import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function ScanResultScreen({ route }) {
  const { imageUri, classification } = route.params;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Resultado del Escaneo</Text>
        
        <Image 
          source={{ uri: imageUri }} 
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Clasificación del Residuo</Text>
          <Text style={styles.resultText}>
            {classification?.data?.[0]?.label || 'No se pudo determinar la clasificación'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  image: {
    width: '100%',
    height: 350,
    marginVertical: 20,
    borderRadius: 15,
    backgroundColor: '#f5f6fa',
  },
  resultContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e',
    marginBottom: 10,
  },
  confidenceText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
});