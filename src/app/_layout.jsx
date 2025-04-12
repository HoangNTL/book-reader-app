import { Stack } from 'expo-router'
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../../global.css'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  )
}
