
import React, { useCallback, useEffect, useState } from 'react';
import { Home } from './src/screens/Home';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter'
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { Routes } from './src/routes';
import { AppProvider } from './src/hooks';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);


  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Inter_400Regular, Inter_500Medium, Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ width: '100%', height: '100%' }}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </View>
  )
}

