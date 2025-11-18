import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

interface LanguageScreenProps {
  navigation?: any;
}

export default function LanguageScreen({ navigation }: LanguageScreenProps) {
  const { language, setLanguage, translations, theme } = useAppContext();

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  
  ];

  const handleSelectLanguage = async (code: string) => {
    await setLanguage(code as any);
  };

  const colors = (() => {
    if (theme === 'dark') return { bg: '#0f1720', text: '#fff', sub: '#cbd5e1' };
    if (theme === 'nasa') return { bg: '#001a4d', text: '#00d4ff', sub: '#a6e8ff' };
    return { bg: '#f7f0f0ff', text: '#333', sub: '#666' };
  })();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.header, { color: colors.text }]}>{translations.idioma ? `Selecciona ${translations.idioma}` : 'Selecciona un idioma'}</Text>

      <View style={styles.languageList}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageItem,
              language === lang.code && styles.languageItemSelected,
            ]}
            onPress={() => handleSelectLanguage(lang.code)}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <View style={styles.languageInfo}>
              <Text style={[styles.languageName, { color: colors.text }]}>{lang.name}</Text>
                <Text style={[styles.languageCode, { color: colors.sub }]}>{lang.code.toUpperCase()}</Text>
            </View>
            {language === lang.code && (
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
  languageList: {
    marginBottom: 24,
  },
  languageItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageItemSelected: {
    borderColor: '#0066cc',
    backgroundColor: '#f0f6ff',
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  languageCode: {
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
