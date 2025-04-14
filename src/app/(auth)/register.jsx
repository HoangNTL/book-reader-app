import React, { useState, useContext } from 'react'
import {
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Pressable
} from 'react-native'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Alert } from 'react-native'

export default function RegisterScreen() {
  const { register } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState(new Date())
  //   const [gender, setGender] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  const router = useRouter()

  const handleRegister = async () => {
    if (!username || !email || !password || !dob) {
      Alert.alert('Missing info', 'Please fill in all fields')
      return
    }
    const { error } = await register({ username, email, password, dob })

    if (error) {
      Alert.alert('Registration failed', error.message)
    } else {
      router.replace('/(main)/(tabs)')
    }
  }

  const showDatePicker = () => {
    setShowPicker(true)
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob
    setShowPicker(Platform.OS === 'ios')
    setDob(currentDate)
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20
        }}
      />
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

      <Text>Date of birth</Text>
      <Pressable
        onPress={showDatePicker}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20
        }}
      >
        <Text>{dob ? dob.toDateString() : 'Select date'}</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* <View
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          marginBottom: 20
        }}
      >
        <Picker selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View> */}
      <Button title="Sign Up" onPress={handleRegister} />
      <Text onPress={() => router.replace('/(auth)/login')}>
        Already have an account
      </Text>
    </View>
  )
}
