import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

interface ThemeScreenProps {
  navigation?: any;
}

export default function ThemeScreen({ navigation }: ThemeScreenProps) {
  const { theme, setTheme, translations } = useAppContext();

  const themes = [
    {
      id: 'light',
      name: 'Claro',
      description: 'Fondo blanco con texto oscuro',
      icon: '☀️',
      backgroundColor: '#ffffff',
      textColor: '#000000',
    },
    {
      id: 'dark',
      name: 'Oscuro',
      description: 'Fondo oscuro con texto claro',
      icon: '🌙',
      backgroundColor: '#1a1a1a',
      textColor: '#fffdfdff',
    },
    {
      id: 'auto',
      name: 'Automático',
      description: 'Según la configuración del sistema',
      icon: '🔄',
      backgroundColor: '#f0f0f0',
      textColor: '#333333',
    },
    {
      id: 'nasa',
      name: 'NASA',
      description: 'Tema personalizado NASA',
      icon: '🚀',
      backgroundColor: '#001a4d',
      textColor: '#00d4ff',
    },
  ];

  const handleSelectTheme = async (id: string) => {
    await setTheme(id as any);
  };

  const colors = (() => {
    if (theme === 'dark') return { bg: '#0f1720', text: '#fff', sub: '#cbd5e1' };
    if (theme === 'nasa') return { bg: '#001a4d', text: '#00d4ff', sub: '#a6e8ff' };
    return { bg: '#f7f0f0ff', text: '#333', sub: '#666' };
  })();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      
      <Text style={[styles.header, { color: colors.text }]}>{translations.tema ? `Elige ${translations.tema}` : 'Elige un tema'}</Text>

      <View style={styles.themeList}>
        {themes.map((themeOption) => (
          <TouchableOpacity
            key={themeOption.id}
            style={[
              styles.themeItem,
              theme === themeOption.id && styles.themeItemSelected,
            ]}
            onPress={() => handleSelectTheme(themeOption.id)}
          >
            <View
              style={[
                styles.themePreview,
                {
                  backgroundColor: themeOption.backgroundColor,
                  borderColor: themeOption.textColor,
                },
              ]}
            >
              <Text style={styles.themeIcon}>{themeOption.icon}</Text>
            </View>
            <View style={styles.themeInfo}>
              <Text style={[styles.themeName, { color: colors.text }]}>{themeOption.name}</Text>
              <Text style={[styles.themeDescription, { color: colors.sub }]}>{themeOption.description}</Text>
            </View>
            {theme === themeOption.id && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
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
    marginBottom: 20,
    color: '#333',
  },
  themeList: {
    marginBottom: 24,
  },
  themeItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeItemSelected: {
    borderColor: '#0066cc',
    backgroundColor: '#f0f6ff',
  },
  themePreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  themeIcon: {
    fontSize: 32,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  themeDescription: {
    fontSize: 12,
    color: '#999',
  },
  checkmark: {
    fontSize: 20,
    color: '#0066cc',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },
});
