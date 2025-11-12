import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { obtenerHistorial } from '../../services/api';
import { getWasteTypeStyle, formatTimeAgo } from '../../utils/functions';
import { useUser } from '../../context/UserContext';



export function HistoryScreen() {
  const { userId } = useUser();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistorial = async () => {
    try {
      setError(null);
      
      if (!userId) {
        setError('No hay usuario activo');
        setLoading(false);
        return;
      }
      
      const response = await obtenerHistorial(userId);
      
      if (response.success) {
        setHistoryData(response.data);
      } else {
        setError('Error al cargar el historial');
      }
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, [userId]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistorial();
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Cargando historial...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="alert-circle" size={60} color="#e74c3c" />
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={fetchHistorial}>Reintentar</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Historial de Escaneos</Text>
      <Text style={styles.subtitle}>
        {historyData.length === 0 
          ? 'No hay escaneos registrados aún' 
          : `${historyData.length} escaneo${historyData.length !== 1 ? 's' : ''} registrado${historyData.length !== 1 ? 's' : ''}`
        }
      </Text>

      {historyData.map((item) => {
        const style = getWasteTypeStyle(item.resultadoClasificacion.tipo);
        const timeAgo = formatTimeAgo(item.fechaClasificacion);
        
        return (
          <View key={item._id} style={styles.historyCard}>
            <View style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: style.backgroundColor }]}>
                <Ionicons name={style.icon} size={24} color={style.color} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.resultadoClasificacion.tipo}</Text>
                <Text style={[styles.itemType, { color: style.color }]}>
                  Confianza: {(item.resultadoClasificacion.confianza * 100).toFixed(1)}%
                </Text>
              </View>
              <Text style={styles.timeText}>{timeAgo}</Text>
            </View>
          </View>
        );
      })}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7f8c8d',
  },
  errorText: {
    marginTop: 15,
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
  },
  retryText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3498db',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
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