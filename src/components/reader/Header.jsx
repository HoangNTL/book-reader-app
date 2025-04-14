import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Header = ({ animatedStyle, title, chapter }) => {
  const router = useRouter()

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <View style={styles.left}>
        {/* <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.chapter}>{chapter}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => console.log('Menu pressed')}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333'
  },
  chapter: {
    fontSize: 14,
    color: '#888'
  }
})

export default Header
