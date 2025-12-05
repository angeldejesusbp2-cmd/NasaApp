import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface DetailScreenProps {
  route?: {
    params?: {
      item: {
        id: string;
        title: string;
        description: string;
        date?: string;
        content?: string;
      };
    };
  };
  navigation?: any;
}

export default function DetailScreen({ route, navigation }: DetailScreenProps) {
  const item = route?.params?.item;

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontraron datos</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
    

      <Text style={styles.title}>{item.title}</Text>

      {item.date && (
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString('es-ES')}</Text>
      )}

      <View style={styles.content}>
        <Text style={styles.descriptionTitle}>Descripción</Text>
        <Text style={styles.description}>{item.description}</Text>

        {item.content && (
          <>
            <Text style={styles.descriptionTitle}>Contenido</Text>
            <Text style={styles.description}>{item.content}</Text>
          </>
        )}
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
  backButton: {
    padding: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
    color: '#cc0000',
    textAlign: 'center',
    marginTop: 20,
  },
});
