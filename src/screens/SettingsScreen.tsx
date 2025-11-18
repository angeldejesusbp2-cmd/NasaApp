import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

interface SettingsScreenProps {
  navigation?: any;
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { language, theme, translations } = useAppContext();
  const [settings, setSettings] = React.useState({
    notifications: true,
    autoplay: false,
    quality: 'high',
  });

  const languageNames: { [key: string]: string } = {
    es: 'Español',
    en: 'English',
  };

  const themeNames: { [key: string]: string } = {
    light: 'Claro',
    dark: 'Oscuro',
    auto: 'Automático',
    nasa: 'NASA',
  };

  const colors = (() => {
    if (theme === 'dark') return { bg: '#030303ff', card: '#1b1c1fff', text: '#ffffffff', sub: '#cbd5e1' };
    if (theme === 'nasa') return { bg: '#001a4d', card: '#002b66', text: '#00d4ff', sub: '#a6e8ff' };
    return { bg: '#f7f0f0ff', card: '#fff', text: '#333', sub: '#666' };
  })();

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key as keyof typeof settings] === 'boolean' 
        ? !(prev[key as keyof typeof settings] as boolean)
        : prev[key as keyof typeof settings],
    }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.header, { color: colors.text }]}>{translations.ajustes || 'Ajustes'}</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.sub }]}>{translations.opciones || 'Aplicación'}</Text>
        
        <TouchableOpacity 
          style={[styles.settingItem, { backgroundColor: colors.card }]}
          onPress={() => navigation?.navigate('Language')}
        >
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>{translations.idioma || 'Idioma'}</Text>
            <Text style={[styles.settingValue, { color: colors.sub }]}>{languageNames[language]}</Text>
          </View>
          <Text style={[styles.arrow, { color: colors.sub }]}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingItem, { backgroundColor: colors.card }]}
          onPress={() => navigation?.navigate('Theme')}
        >
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>{translations.tema || 'Tema'}</Text>
            <Text style={[styles.settingValue, { color: colors.sub }]}>{themeNames[theme]}</Text>
          </View>
          <Text style={[styles.arrow, { color: colors.sub }]}>›</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 8,
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
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 12,
    color: '#999',
  },
  arrow: {
    fontSize: 24,
    color: '#ccc',
    marginLeft: 12,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: {
    backgroundColor: '#0066cc',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleCircleOn: {
    alignSelf: 'flex-end',
  },
});
