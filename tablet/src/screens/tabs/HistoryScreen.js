import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const historyData = [
  {
    id: 1,
    item: 'Plastic Bottle',
    type: 'Recyclable',
    icon: 'reload-circle',
    color: '#3498db',
    time: '2m ago',
    backgroundColor: '#f0f9ff'
  },
  {
    id: 2,
    item: 'Banana Peel',
    type: 'Compost',
    icon: 'leaf',
    color: '#2ecc71',
    time: '15m ago',
    backgroundColor: '#f0fff0'
  },
  {
    id: 3,
    item: 'Plastic Bag',
    type: 'Trash',
    icon: 'trash',
    color: '#95a5a6',
    time: '1h ago',
    backgroundColor: '#f0f0f0'
  },
  {
    id: 4,
    item: 'Battery',
    type: 'Hazardous',
    icon: 'warning',
    color: '#e74c3c',
    time: '2h ago',
    backgroundColor: '#fff0f0'
  }
];

export function HistoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Scan History</Text>
      <Text style={styles.subtitle}>View all your previous scans</Text>

      {historyData.map((item) => (
        <View key={item.id} style={styles.historyCard}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.item}</Text>
              <Text style={[styles.itemType, { color: item.color }]}>{item.type}</Text>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingBottom: 20,
    paddingHorizontal: 100
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  itemType: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 14,
    color: '#95a5a6',
  },
});