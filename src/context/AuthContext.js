import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '@/lib/supabase'
import * as Crypto from 'expo-crypto'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.error('Error loading user from storage:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadUser()
  }, [])

  const register = async ({ username, email, password, dob }) => {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existingUser) {
      return { error: new Error('Email đã tồn tại') }
    }

    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    )

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username,
          email,
          password: hashedPassword,
          date_of_birth:
            dob instanceof Date ? dob.toISOString().split('T')[0] : null
        }
      ])
      .select()

    if (error) {
      console.error('Registration error:', error)
      return { error }
    }

    const user = {
      id: data[0]?.id,
      email: data[0]?.email,
      username: data[0]?.username,
      role: data[0]?.role
    }

    setUser(user)
    await AsyncStorage.setItem('user', JSON.stringify(user))
    return { user: user }
  }

  const login = async ({ email, password }) => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    )

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', hashedPassword)
      .single()

    if (error || !data) {
      console.error('Login error:', error)
      return { error: new Error('Invalid email or password') }
    }

    const user = {
      id: data.id,
      email: data.email,
      username: data.username,
      role: data.role
    }

    setUser(user)
    await AsyncStorage.setItem('user', JSON.stringify(user))
    return { user: user }
  }

  const logout = async () => {
    setUser(null)
    await AsyncStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
