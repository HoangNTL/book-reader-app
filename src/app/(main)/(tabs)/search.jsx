import React from 'react'
import { View, TextInput } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BookListVertical from '@/components/bookListVertical'

export default function SearchScreen() {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingBottom: 56
      }}
    >
      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          paddingLeft: 10,
          borderRadius: 24,
          backgroundColor: '#fff'
        }}
      >
        <FontAwesome
          name="search"
          size={24}
          color="gray"
          style={{
            marginRight: 10
          }}
        />
        <TextInput
          style={{
            flex: 1,
            height: '100%'
          }}
          placeholder="Search for books..."
        />
      </View>

      <View
        style={{
          paddingHorizontal: 8,
          marginBottom: 60
        }}
      >
        <BookListVertical />
      </View>
    </View>
  )
}
