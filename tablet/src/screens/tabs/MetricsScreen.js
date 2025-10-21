import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function MetricsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ISO Compliance Metrics</Text>
      <Text style={styles.subtitle}>Track waste management performance</Text>

      <View style={styles.diversionCard}>
        <View style={styles.diversionContent}>
          <View>
            <Text style={styles.diversionRate}>67%</Text>
            <Text style={styles.metricLabel}>ISO 14001 Metric</Text>
          </View>
          <View style={styles.trendIcon}>
            <Ionicons name="trending-up" size={24} color="#3498db" />
          </View>
        </View>
        <Text style={styles.diversionTitle}>Waste Diversion Rate</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalTitle}>Total Items Scanned</Text>
        <Text style={styles.totalNumber}>42</Text>
      </View>

      <View style={styles.grid}>
        <View style={[styles.gridItem, styles.recyclableCard]}>
          <Ionicons name="reload-circle" size={30} color="#3498db" />
          <Text style={styles.gridNumber}>18</Text>
          <Text style={[styles.gridLabel, styles.recyclableText]}>Recyclable</Text>
        </View>

        <View style={[styles.gridItem, styles.compostCard]}>
          <Ionicons name="leaf" size={30} color="#2ecc71" />
          <Text style={styles.gridNumber}>10</Text>
          <Text style={[styles.gridLabel, styles.compostText]}>Compost</Text>
        </View>
   
        <View style={[styles.gridItem, styles.trashCard]}>
          <Ionicons name="trash" size={30} color="#95a5a6" />
          <Text style={styles.gridNumber}>12</Text>
          <Text style={[styles.gridLabel, styles.trashText]}>Trash</Text>
        </View>

        <View style={[styles.gridItem, styles.hazardousCard]}>
          <Ionicons name="warning" size={30} color="#e74c3c" />
          <Text style={styles.gridNumber}>2</Text>
          <Text style={[styles.gridLabel, styles.hazardousText]}>Hazardous</Text>
        </View>
      </View>

      <View style={styles.guidelinesCard}>
        <Text style={styles.guidelinesTitle}>ISO 14001 Guidelines</Text>
        <View style={styles.guidelineItem}>
          <Ionicons name="checkmark" size={20} color="#3498db" />
          <Text style={styles.guidelineText}>Track waste separation accuracy</Text>
        </View>
        <View style={styles.guidelineItem}>
          <Ionicons name="checkmark" size={20} color="#3498db" />
          <Text style={styles.guidelineText}>Monitor diversion rates monthly</Text>
        </View>
        <View style={styles.guidelineItem}>
          <Ionicons name="checkmark" size={20} color="#3498db" />
          <Text style={styles.guidelineText}>Document hazardous waste handling</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingBottom: 20
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
  diversionCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  diversionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diversionTitle: {
    fontSize: 20,
    color: '#3498db',
    fontWeight: '600',
  },
  diversionRate: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
  },
  metricLabel: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  trendIcon: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
  },
  totalCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalTitle: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 10,
  },
  totalNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3498db',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: '48%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  recyclableCard: {
    backgroundColor: '#f0f9ff',
  },
  compostCard: {
    backgroundColor: '#f0fff0',
  },
  trashCard: {
    backgroundColor: '#f0f0f0',
  },
  hazardousCard: {
    backgroundColor: '#fff0f0',
  },
  gridNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  recyclableText: {
    color: '#3498db',
  },
  compostText: {
    color: '#2ecc71',
  },
  trashText: {
    color: '#95a5a6',
  },
  hazardousText: {
    color: '#e74c3c',
  },
  guidelinesCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 15,
    padding: 20,
  },
  guidelinesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  guidelineText: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 10,
  },
});