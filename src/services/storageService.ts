import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  THEME: 'nasa_app_theme',
  LANGUAGE: 'nasa_app_language',
  OPTIONS: 'nasa_app_options',
  FAVORITES: 'nasa_app_favorites',
};

export const StorageService = {
  // Tema
  async getTheme(): Promise<string> {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      return theme || 'light';
    } catch (error) {
      console.error('Error getting theme:', error);
      return 'light';
    }
  },

  async setTheme(theme: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  },

  // Idioma
  async getLanguage(): Promise<string> {
    try {
      const language = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return language || 'es';
    } catch (error) {
      console.error('Error getting language:', error);
      return 'es';
    }
  },

  async setLanguage(language: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  },

  // Opciones
  async getOptions(): Promise<{
    saveSearchHistory: boolean;
    compressImages: boolean;
    enableAnalytics: boolean;
    showTips: boolean;
  }> {
    try {
      const options = await AsyncStorage.getItem(STORAGE_KEYS.OPTIONS);
      return options
        ? JSON.parse(options)
        : {
            saveSearchHistory: true,
            compressImages: false,
            enableAnalytics: true,
            showTips: true,
          };
    } catch (error) {
      console.error('Error getting options:', error);
      return {
        saveSearchHistory: true,
        compressImages: false,
        enableAnalytics: true,
        showTips: true,
      };
    }
  },

  async setOptions(options: {
    saveSearchHistory: boolean;
    compressImages: boolean;
    enableAnalytics: boolean;
    showTips: boolean;
  }): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.OPTIONS, JSON.stringify(options));
    } catch (error) {
      console.error('Error setting options:', error);
    }
  },

  // Favoritos
  async getFavorites(): Promise<any[]> {
    try {
      const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async addFavorite(item: any): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const exists = favorites.some((fav) => fav.id === item.id);
      if (!exists) {
        favorites.push(item);
        await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  async removeFavorite(itemId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const filtered = favorites.filter((fav) => fav.id !== itemId);
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  // Historial de búsqueda
  async addSearchHistory(query: string): Promise<void> {
    try {
      const options = await this.getOptions();
      if (!options.saveSearchHistory) return;

      const key = 'nasa_app_search_history';
      const history = await AsyncStorage.getItem(key);
      let searches = history ? JSON.parse(history) : [];

      // Remover duplicados y agregar al inicio
      searches = searches.filter((s: string) => s !== query);
      searches.unshift(query);

      // Mantener solo los últimos 20
      searches = searches.slice(0, 20);

      await AsyncStorage.setItem(key, JSON.stringify(searches));
    } catch (error) {
      console.error('Error adding to search history:', error);
    }
  },

  async getSearchHistory(): Promise<string[]> {
    try {
      const key = 'nasa_app_search_history';
      const history = await AsyncStorage.getItem(key);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  },

  async clearSearchHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem('nasa_app_search_history');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  },

  // Limpiar caché
  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem('nasa_app_cache');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },
};
