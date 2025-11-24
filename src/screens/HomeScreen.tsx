import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NasaAPI } from '../services';

interface PictureOfDay {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
}

export default function HomeScreen({ navigation }: { navigation?: any }) {
  const [pictureOfDay, setPictureOfDay] = React.useState<PictureOfDay | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchPictureOfDay();
  }, []);

  const fetchPictureOfDay = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await NasaAPI.getPictureOfDay();
      setPictureOfDay(data);
    } catch (err) {
      setError('Error al obtener la imagen del día. Verifica tu API Key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>NASA App</Text>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Cargando contenido...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>NASA App</Text>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPictureOfDay}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>NASA App</Text>

      {pictureOfDay && (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation?.navigate('Detail', { item: pictureOfDay })}
        >
          <Text style={styles.sectionTitle}>Imagen del Día</Text>

          {pictureOfDay.media_type === 'image' && pictureOfDay.url && (
            <Image
              source={{ uri: pictureOfDay.url }}
              style={styles.image}
              onError={(e) => console.log('Error loading image:', e)}
            />
          )}

          {pictureOfDay.media_type === 'video' && pictureOfDay.url && (
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoText}>🎥 Video</Text>
            </View>
          )}

          <Text style={styles.title}>{pictureOfDay.title}</Text>
          <Text style={styles.date}>{new Date(pictureOfDay.date).toLocaleDateString('es-ES')}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {pictureOfDay.explanation}
          </Text>

          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Ver Detalles →</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      <View style={styles.exploreSection}>
        <Text style={styles.sectionTitle}>Explorar</Text>

        <TouchableOpacity
          style={styles.exploreCard}
          onPress={() => navigation?.navigate('Search')}
        >
          <Text style={styles.exploreIcon}>🔍</Text>
          <Text style={styles.exploreTitle}>Buscar Contenido</Text>
          <Text style={styles.exploreDescription}>Encuentra imágenes y videos</Text>
        </TouchableOpacity>

       
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f0f0ff',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
    color: '#333',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#cc0000',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    fontSize: 32,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  viewButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exploreSection: {
    marginBottom: 20,
  },
  exploreCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exploreIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  exploreDescription: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

