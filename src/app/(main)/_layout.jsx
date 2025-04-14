import { Stack, useRouter } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'

export default function MainLayout() {
  const { user, isLoading } = useContext(AuthContext)
  const router = useRouter()
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    if (!isLoading && !user && !hasRedirected) {
      setHasRedirected(true)
      router.replace('/login')
    }
  }, [isLoading, user, hasRedirected])

  if (isLoading || (!user && !hasRedirected)) {
    return null
  }

  return <Stack />
}
