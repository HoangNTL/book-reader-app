import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

const BookItem = ({ book }) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.push(`/bookDetail/${book.id}`)}
      style={{
        flexDirection: 'column'
      }}
    >
      <Image
        source={{ uri: book.image }}
        style={{
          width: 112,
          height: 168,
          // borderRadius: 8,
          backgroundColor: '#ddd',
          marginRight: 12
        }}
      />
      <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 100 }}>
        {book.title}
      </Text>
    </TouchableOpacity>
  )
}

export default BookItem
