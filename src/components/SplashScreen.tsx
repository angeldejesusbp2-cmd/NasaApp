import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';

/**
 * Definición de las Props (Propiedades) del componente SplashScreen.
 * Esto asegura que la propiedad 'onFinish' sea una función sin argumentos que no devuelve nada (void).
 */
interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Definición de la secuencia de animación: Fade In -> Retraso -> Fade Out
    Animated.sequence([
      // 1. Fade In (Aparecer)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, // 2 segundos
        useNativeDriver: true,
      }),
      // 2. Delay (Mantener visible)
      Animated.delay(1000),
      // 3. Fade Out (Desaparecer)
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // 1 segundo
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 4. Callback: Cuando la animación termina, llama a la función onFinish
      onFinish();
    });
  }, [onFinish]); // Agregamos 'onFinish' como dependencia del useEffect

  // El tipo StyleProp<ViewStyle> se utiliza para las propiedades de estilo animadas
  const animatedStyle: StyleProp<ViewStyle> = {
    opacity: fadeAnim,
  };

  return (
    <View style={styles.container}>
      {/* Aplicamos el estilo de opacidad animado al contenedor del logo */}
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Image
          // Nota: El path de la imagen debe ser correcto en tu entorno de proyecto
          source={require('../../assets/NasaApp.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;