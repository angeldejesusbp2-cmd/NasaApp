import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { StorageService } from '../services';

interface OptionsScreenProps {
  navigation?: any;
}

export default function OptionsScreen({ navigation }: OptionsScreenProps) {
  const [options, setOptions] = React.useState({
    saveSearchHistory: true,
    compressImages: false,
    enableAnalytics: true,
    showTips: true,
  });

  React.useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    const savedOptions = await StorageService.getOptions();
    setOptions(savedOptions);
  };

  const toggleOption = async (key: keyof typeof options) => {
    const newOptions = {
      ...options,
      [key]: !options[key],
    };
    setOptions(newOptions);
    await StorageService.setOptions(newOptions);
  };

  const handleClearSearchHistory = () => {
    Alert.alert(
      'Limpiar historial',
      '¿Estás seguro de que deseas limpiar el historial de búsqueda?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearSearchHistory();
            Alert.alert('Éxito', 'Historial de búsqueda limpiado');
          },
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Limpiar caché',
      '¿Estás seguro de que deseas limpiar el caché?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearCache();
            Alert.alert('Éxito', 'Caché limpiado correctamente');
          },
        },
      ]
    );
  };

  const handleResetOptions = () => {
    Alert.alert(
      'Restablecer opciones',
      '¿Estás seguro de que deseas restablecer todas las opciones?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Restablecer',
          style: 'destructive',
          onPress: async () => {
            const defaultOptions = {
              saveSearchHistory: true,
              compressImages: false,
              enableAnalytics: true,
              showTips: true,
            };
            setOptions(defaultOptions);
            await StorageService.setOptions(defaultOptions);
            Alert.alert('Éxito', 'Opciones restablecidas a valores por defecto');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Text style={styles.backButtonText}>← Atrás</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Opciones</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Búsqueda</Text>

        <View style={styles.optionItem}>
          <View style={styles.optionContent}>
            <Text style={styles.optionLabel}>Guardar historial de búsqueda</Text>
            <Text style={styles.optionDescription}>
              Guarda tus búsquedas recientes para un acceso rápido
            </Text>
          </View>
          <Switch
            value={options.saveSearchHistory}
            onValueChange={() => toggleOption('saveSearchHistory')}
            trackColor={{ false: '#ddd', true: '#81c784' }}
            thumbColor={options.saveSearchHistory ? '#0066cc' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descarga y Almacenamiento</Text>

        <View style={styles.optionItem}>
          <View style={styles.optionContent}>
            <Text style={styles.optionLabel}>Comprimir imágenes</Text>
            <Text style={styles.optionDescription}>
              Reduce el tamaño de descarga comprimiendo imágenes
            </Text>
          </View>
          <Switch
            value={options.compressImages}
            onValueChange={() => toggleOption('compressImages')}
            trackColor={{ false: '#ddd', true: '#81c784' }}
            thumbColor={options.compressImages ? '#0066cc' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={styles.actionItem} onPress={handleClearSearchHistory}>
          <View style={styles.actionContent}>
            <Text style={styles.actionLabel}>Limpiar historial de búsqueda</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={handleClearCache}>
          <View style={styles.actionContent}>
            <Text style={styles.actionLabel}>Limpiar caché</Text>
            <Text style={styles.actionDescription}>Libera espacio de almacenamiento</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidad</Text>

        <View style={styles.optionItem}>
          <View style={styles.optionContent}>
            <Text style={styles.optionLabel}>Habilitar analítica</Text>
            <Text style={styles.optionDescription}>
              Ayúdanos a mejorar la app compartiendo datos de uso anónimos
            </Text>
          </View>
          <Switch
            value={options.enableAnalytics}
            onValueChange={() => toggleOption('enableAnalytics')}
            trackColor={{ false: '#ddd', true: '#81c784' }}
            thumbColor={options.enableAnalytics ? '#0066cc' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiencia</Text>

        <View style={styles.optionItem}>
          <View style={styles.optionContent}>
            <Text style={styles.optionLabel}>Mostrar consejos</Text>
            <Text style={styles.optionDescription}>
              Muestra consejos útiles al usar la app
            </Text>
          </View>
          <Switch
            value={options.showTips}
            onValueChange={() => toggleOption('showTips')}
            trackColor={{ false: '#ddd', true: '#81c784' }}
            thumbColor={options.showTips ? '#0066cc' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.actionItem, styles.dangerItem]} onPress={handleResetOptions}>
          <Text style={styles.dangerLabel}>Restablecer todas las opciones</Text>
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
  backButton: {
    padding: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '600',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: '#999',
  },
  actionItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  actionDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 12,
  },
  dangerItem: {
    backgroundColor: '#fff3f3',
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  dangerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cc0000',
  },
});
