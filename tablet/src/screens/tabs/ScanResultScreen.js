import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ScanResultScreen({ route, navigation }) {
  const { imageUri, classification, pointsEarned } = route.params;
  
  const isGuestMode = route?.name === 'GuestScanResult';  

  const handleScanAgain = () => {
    if (isGuestMode) {
      navigation.navigate('GuestScan');
    } else {
      navigation.navigate('ScanMain');
    }
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image 
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.successHeader}>
        <Ionicons name="checkmark-circle" size={30} color="#37b859" />
        <Text style={styles.successText}>¡Item identificado exitosamente!</Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.categoryLabel}>Categoría:</Text>
        <Text style={styles.categoryValue}>{classification}</Text>
        
        {pointsEarned && (
          <View style={styles.pointsSection}>
            <View style={styles.pointsHeader}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={styles.pointsTitle}>¡Puntos Ganados!</Text>
            </View>
            <Text style={styles.pointsValue}>+{pointsEarned} puntos</Text>
            <Text style={styles.pointsSubtext}>
              Gracias por ayudar al medio ambiente
            </Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.scanAgainButton}
          onPress={handleScanAgain}
        >
          <Ionicons name="camera-outline" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.scanAgainText}>Escanear Otro Objeto</Text>
        </TouchableOpacity>
        
        {isGuestMode && (
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={handleGoHome}
          >
            <Ionicons name="home-outline" size={24} color="#37b859" style={styles.buttonIcon} />
            <Text style={styles.homeButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingHorizontal: 100,
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  successText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#37b859',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  categoryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  pointsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    alignItems: 'center',
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 8,
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#37b859',
    marginBottom: 5,
  },
  pointsSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  confidencesSection: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  confidencesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  confidenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  confidenceValue: {
    fontSize: 14,
    color: '#37b859',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 15,
    paddingBottom: 20,
  },
  scanAgainButton: {
    backgroundColor: '#37b859',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanAgainText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#37b859',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37b859',
  },
  buttonIcon: {
    marginRight: 10,
  },
});