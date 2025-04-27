import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Animated from 'react-native-reanimated'

type HeaderProps = {
  title: string
  chapter: string
}

const Header: React.FC<HeaderProps> = ({ title, chapter }) => {
  const router = useRouter()

  return (
    <Animated.View
      style={{
        // backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 10,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            {title}
          </Text>
          <Text>{chapter}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => console.log('Menu pressed')}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Header
