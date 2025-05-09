import { Inter_900Black, useFonts } from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-gesture-handler'
import { Slot } from 'expo-router'
import { AuthProvider } from '../context/AuthContext'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}
