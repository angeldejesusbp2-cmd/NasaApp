import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useAppContext } from '../context/AppContext';

import {
  HomeScreen,
  DetailScreen,
  FavoritesScreen,
  SearchScreen,
  SettingsScreen,
  LanguageScreen,
  ThemeScreen,
  HelpScreen,
  OptionsScreen,
} from '../screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const navigationRef = createNavigationContainerRef();

// default options will be created inside RootNavigator to read theme

function HomeStack({ defaultOptions, titles }: { defaultOptions: NativeStackNavigationOptions; titles: any }) {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ 
          title: titles.home || 'Inicio',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ 
          title: titles.details || 'Detalles',
          headerBackTitle: titles.back || 'Atrás',
        }}
      />
    </Stack.Navigator>
  );
}

function FavoritesStack({ defaultOptions, titles }: { defaultOptions: NativeStackNavigationOptions; titles: any }) {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="FavoritesMain"
        component={FavoritesScreen}
        options={{ 
          title: titles.favorites || 'Favoritos',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailFromFav"
        component={DetailScreen}
        options={{ 
          title: titles.details || 'Detalles',
          headerBackTitle: titles.back || 'Atrás',
        }}
      />
    </Stack.Navigator>
  );
}

function SearchStack({ defaultOptions, titles }: { defaultOptions: NativeStackNavigationOptions; titles: any }) {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="SearchMain"
        component={SearchScreen}
        options={{ 
          title: titles.search || 'Buscar',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailFromSearch"
        component={DetailScreen}
        options={{ 
          title: titles.details || 'Detalles',
          headerBackTitle: titles.back || 'Atrás',
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack({ defaultOptions, titles }: { defaultOptions: NativeStackNavigationOptions; titles: any }) {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ 
          title: titles.settings || 'Ajustes',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{ 
          title: titles.language || 'Idioma',
          headerBackTitle: titles.back || 'Atrás',
        }}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{ 
          title: titles.theme || 'Tema',
          headerBackTitle: titles.back || 'Atrás',
        }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ 
          title: titles.help || 'Ayuda',
          headerBackTitle: titles.back || 'Atrás',
        }}
      />
      <Stack.Screen
        name="Options"
        component={OptionsScreen}
        options={{ 
          title: titles.options || 'Opciones',
          headerBackTitle: titles.back || 'Atrás',
        }}
      />
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  const { translations, theme } = useAppContext();

  const colors = (() => {
    if (theme === 'dark') return { bg: '#0f1720', card: '#0b1220', text: '#fff', sub: '#cbd5e1', accent: '#60a5fa' };
    if (theme === 'nasa') return { bg: '#001a4d', card: '#002b66', text: '#00d4ff', sub: '#a6e8ff', accent: '#00d4ff' };
    return { bg: '#ffffff', card: '#fff', text: '#333', sub: '#666', accent: '#0066cc' };
  })();

  const defaultStackScreenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: colors.card,
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
  };

  const titles = {
    home: translations.inicio,
    search: translations.buscar,
    favorites: translations.favoritos,
    settings: translations.ajustes,
    language: translations.idioma,
    theme: translations.tema,
    help: translations.ayuda,
    options: translations.opciones,
    details: translations.detalles,
    back: translations.atras,
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon = '';

            if (route.name === 'Home') {
              icon = focused ? '🏠' : '🏡';
            } else if (route.name === 'Favorites') {
              icon = focused ? '❤️' : '🤍';
            } else if (route.name === 'Search') {
              icon = focused ? '🔍' : '🔎';
            } else if (route.name === 'Settings') {
              icon = focused ? '⚙️' : '⚒️';
            }

            return <Text style={{ fontSize: 20 }}>{icon}</Text>;
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.sub,
          tabBarStyle: {
            backgroundColor: colors.bg,
            borderTopWidth: 1,
            borderTopColor: '#eee',
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" options={{ title: titles.home || 'Inicio' }}>
          {props => <HomeStack {...props} defaultOptions={defaultStackScreenOptions} titles={titles} />}
        </Tab.Screen>

        <Tab.Screen name="Search" options={{ title: titles.search || 'Buscar' }}>
          {props => <SearchStack {...props} defaultOptions={defaultStackScreenOptions} titles={titles} />}
        </Tab.Screen>

        <Tab.Screen name="Favorites" options={{ title: titles.favorites || 'Favoritos' }}>
          {props => <FavoritesStack {...props} defaultOptions={defaultStackScreenOptions} titles={titles} />}
        </Tab.Screen>

        <Tab.Screen name="Settings" options={{ title: titles.settings || 'Ajustes' }}>
          {props => <SettingsStack {...props} defaultOptions={defaultStackScreenOptions} titles={titles} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
