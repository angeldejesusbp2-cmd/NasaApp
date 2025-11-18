import AsyncStorage from '@react-native-async-storage/async-storage';

// Test de almacenamiento
export async function testStorage() {
  try {
    console.log('Testing AsyncStorage...');
    
    // Test 1: Guardar un valor
    await AsyncStorage.setItem('test_key', 'test_value');
    console.log('✓ Guardado correctamente');
    
    // Test 2: Recuperar el valor
    const value = await AsyncStorage.getItem('test_key');
    console.log('✓ Recuperado:', value);
    
    // Test 3: Guardar idioma
    await AsyncStorage.setItem('nasa_app_language', 'en');
    const lang = await AsyncStorage.getItem('nasa_app_language');
    console.log('✓ Idioma guardado:', lang);
    
    // Test 4: Guardar tema
    await AsyncStorage.setItem('nasa_app_theme', 'dark');
    const theme = await AsyncStorage.getItem('nasa_app_theme');
    console.log('✓ Tema guardado:', theme);
    
    console.log('✓ AsyncStorage funcionando correctamente');
    return true;
  } catch (error) {
    console.error('✗ Error en AsyncStorage:', error);
    return false;
  }
}
