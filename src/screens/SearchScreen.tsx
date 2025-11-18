import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { NasaAPI } from '../services';

interface SearchResult {
  href?: string;
  data?: Array<{
    nasa_id: string;
    title: string;
    description: string;
  }>;
  links?: Array<{ rel: string; href: string }>;
}

export default function SearchScreen({ navigation }: { navigation?: any }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [searched, setSearched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setSearched(true);
      const data = await NasaAPI.searchAssets(searchQuery);
      setResults(data.collection?.items || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (item: SearchResult) => {
    if (item.links && item.links.length > 0) {
      const imageLink = item.links.find((l) => l.rel === 'preview');
      return imageLink?.href || item.links[0].href;
    }
    return null;
  };

  const renderItem = ({ item }: { item: SearchResult }) => {
    const imageUrl = getImageUrl(item);
    const title = item.data?.[0]?.title || 'Sin título';
    const description = item.data?.[0]?.description || '';
    const id = item.data?.[0]?.nasa_id || Math.random().toString();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation?.navigate('DetailFromSearch', { 
          item: { 
            id,
            title, 
            description,
            url: imageUrl,
            links: item.links,
          } 
        })}
      >
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.thumbnail} onError={() => {}} />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buscar</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Busca en NASA..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
          <Text style={styles.searchButtonText}>{loading ? '...' : '🔍'}</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Buscando...</Text>
        </View>
      )}

      {!loading && (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.data?.[0]?.nasa_id || index.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searched ? 'No se encontraron resultados. Intenta con otros términos.' : 'Escribe para buscar en NASA'}
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f0f0ff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

