import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '../services';
import { navigationRef } from '../navigation/RootNavigator';

export type Language = 'es' | 'en' ;
export type Theme = 'light' | 'dark' | 'auto' | 'nasa';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  translations: { [key: string]: string };
  goTo: (screenName: string, params?: any) => void;
  openHome: () => void;
  openSearch: () => void;
  openFavorites: () => void;
  openSettings: () => void;
  goBack: () => void;
}

const translations: { [key in Language]: { [key: string]: string } } = {
  es: {
    inicio: 'Inicio',
    buscar: 'Buscar',
    favoritos: 'Favoritos',
    ajustes: 'Ajustes',
    idioma: 'Idioma',
    tema: 'Tema',
    ayuda: 'Ayuda',
    opciones: 'Opciones',
    buscando: 'Buscando...',
    noResultados: 'No se encontraron resultados',
    escribePara: 'Escribe para buscar en NASA',
    detalles: 'Detalles',
    atras: 'Atrás',
    noFavoritos: 'No tienes favoritos aún',
    imagenDelDia: 'Imagen del Día',
  },
  en: {
    inicio: 'Home',
    buscar: 'Search',
    favoritos: 'Favorites',
    ajustes: 'Settings',
    idioma: 'Language',
    tema: 'Theme',
    ayuda: 'Help',
    opciones: 'Options',
    buscando: 'Searching...',
    noResultados: 'No results found',
    escribePara: 'Type to search NASA',
    detalles: 'Details',
    atras: 'Back',
    noFavoritos: 'No favorites yet',
    imagenDelDia: 'Picture of the Day',
  },
 
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguageState] = useState<Language>('es');
  const [theme, setThemeState] = useState<Theme>('light');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLanguage = (await StorageService.getLanguage()) as Language;
      const savedTheme = (await StorageService.getTheme()) as Theme;
      setLanguageState(savedLanguage);
      setThemeState(savedTheme);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsReady(true);
    }
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await StorageService.setLanguage(lang);
  };

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await StorageService.setTheme(newTheme);
  };

  // Expose setters globally so non-React modules can call them (fallback)
  React.useEffect(() => {
    try {
      (globalThis as any).__APP_SET_LANGUAGE = setLanguage;
      (globalThis as any).__APP_SET_THEME = setTheme;
    } catch (e) {
      // ignore in environments where globalThis isn't writable
    }

    return () => {
      try {
        delete (globalThis as any).__APP_SET_LANGUAGE;
        delete (globalThis as any).__APP_SET_THEME;
      } catch (e) {
        // ignore
      }
    };
  }, [setLanguage, setTheme]);

  const goTo = (screenName: string, params?: any) => {
    try {
      if (navigationRef && navigationRef.isReady()) {
        // navigate accepts generics; cast to any to avoid TS errors here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigationRef.navigate(screenName, params);
      }
    } catch (error) {
      console.warn('Navigation goTo error:', error);
    }
  };

  const openHome = () => goTo('Home');
  const openSearch = () => goTo('Search');
  const openFavorites = () => goTo('Favorites');
  const openSettings = () => goTo('Settings');

  const goBack = () => {
    try {
      if (navigationRef && navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
      }
    } catch (error) {
      console.warn('Navigation goBack error:', error);
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        translations: translations[language],
        goTo,
        openHome,
        openSearch,
        openFavorites,
        openSettings,
        goBack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
}
