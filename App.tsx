import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { useState } from 'react';
import { RootNavigator } from './src/navigation';
import { AppProvider } from './src/context/AppContext';
import type { Language, Theme } from './src/context/AppContext';
import { StorageService } from './src/services';
import { navigationRef } from './src/navigation/RootNavigator';
import SplashScreen from './src/components/SplashScreen';

export const goTo = (screenName: string, params?: any) => {
  try {
    if (navigationRef && navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(screenName, params);
    }
  } catch (error) {
    // ignore for now
    // eslint-disable-next-line no-console
    console.warn('goTo navigation error', error);
  }
};

export const openHome = () => goTo('Home');
export const openSearch = () => goTo('Search');
export const openFavorites = () => goTo('Favorites');
export const openSettings = () => goTo('Settings');

export const goBack = () => {
  try {
    if (navigationRef && navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('goBack navigation error', error);
  }
};

export const changeLanguage = async (lang: Language) => {
  try {
    const setter = (globalThis as any).__APP_SET_LANGUAGE as ((l: Language) => Promise<void>) | undefined;
    if (setter) {
      await setter(lang);
    } else {
      await StorageService.setLanguage(lang);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('changeLanguage error', error);
  }
};

export const changeTheme = async (theme: Theme) => {
  try {
    const setter = (globalThis as any).__APP_SET_THEME as ((t: Theme) => Promise<void>) | undefined;
    if (setter) {
      await setter(theme);
    } else {
      await StorageService.setTheme(theme);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('changeTheme error', error);
  }
};

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const handleSplashFinish = () => {
    setIsSplashFinished(true);
  };

  if (!isSplashFinished) {
    // Pasa la función de callback a tu SplashScreen
    return <SplashScreen onFinish={handleSplashFinish} />;
  }
  return (
    <AppProvider>
      <SafeAreaProvider>
        <RootNavigator />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </AppProvider>
  );
}
