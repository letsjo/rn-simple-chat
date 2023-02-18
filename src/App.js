import { useCallback, useEffect, useState } from 'react'
import { StatusBar, Image, View } from 'react-native'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import { images } from './utils/Images'

import * as SplashScreen from 'expo-splash-screen';

import Navigation from './navigations';

SplashScreen.preventAutoHideAsync();

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  });
}

const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font))
}

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const _loadAssets = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const imageAssets = cacheImages([
          require('../assets/splash.png'),
          ...Object.values(images),
        ])
        const fontAssets = cacheFonts([]);
        await Promise.all([...imageAssets, ...fontAssets])
      } catch (e) {
        console.warn;
      } finally {
        setIsReady(true);
      }
    }

    _loadAssets();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={ { flex: 1 } } onLayout={ onLayoutRootView }>
      <ThemeProvider
        theme={ theme }
      >
        <StatusBar barStyle='dark-content' />
        <Navigation />
      </ThemeProvider>
    </View>
  )
}

export default App