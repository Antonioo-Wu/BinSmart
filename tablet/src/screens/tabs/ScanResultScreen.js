import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ScanResultScreen({ route, navigation }) {
  const { imageUri, classification } = route.params;

  const handleScanAgain = () => {
    navigation.navigate('ScanMain');
  };

  return (
    <View style={styles.container}>
      {/* Image Preview */}
      <Image 
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Success Header */}
      <View style={styles.successHeader}>
        <Ionicons name="checkmark-circle" size={30} color="#3498db" />
        <Text style={styles.successText}>Item identified successfully!</Text>
      </View>

      {/* Item Name Card */}
      <View style={styles.itemCard}>
        <Text style={styles.itemName}>Plastic Bottle</Text>
      </View>

      {/* Bin Information Card */}
      <View style={styles.binCard}>
        <View style={styles.binHeaderRow}>
          <Ionicons name="reload-circle" size={30} color="#3498db" />
          <Text style={styles.binHeaderText}>Use this bin:</Text>
        </View>
        <Text style={styles.binName}>Blue Recycling Bin</Text>
        <Text style={styles.binInstructions}>
          This item can be recycled. Please rinse before placing in bin.
        </Text>
      </View>

      {/* Scan Again Button */}
      <TouchableOpacity 
        style={styles.scanAgainButton}
        onPress={handleScanAgain}
      >
        <Text style={styles.scanAgainText}>Scan Another Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingHorizontal: 100
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
    color: '#3498db',
    fontWeight: '600',
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
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
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  binCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e1f0ff',
  },
  binHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  binHeaderText: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: '600',
  },
  binName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  binInstructions: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
  },
  scanAgainButton: {
    backgroundColor: '#3498db',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  scanAgainText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});