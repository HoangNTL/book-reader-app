import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import { useRouter } from 'expo-router'
import { Alert } from 'react-native'

export default function LoginScreen() {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please fill in all fields')
      return
    }

    const { error } = await login({ email, password })

    if (error) {
      Alert.alert('Login failed', error.message)
    } else {
      router.replace('/(main)')
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20
        }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => router.replace('/(auth)/register')}>
        Don't have an account? Sign up
      </Text>
    </View>
  )
}
