import React from 'react'
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

const BookItem = ({ book }) => {
  const router = useRouter()

  const handleSelectBook = (bookId) => {
    router.push(`/bookDetail/${bookId}`)
  }

  return (
    <TouchableOpacity onPress={() => handleSelectBook(book.id)}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 120,
          margin: 8
        }}
      >
        <Image
          source={{
            uri:
              book.image ||
              'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
          }}
          style={{
            width: 80,
            height: '100%',
            marginRight: 10
          }}
        />
        {/* Book information */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black'
            }}
          >
            {book.title}
          </Text>

          {/* Author */}
          <Text
            style={{
              fontSize: 12,
              color: 'gray'
            }}
          >
            {book.author}
          </Text>

          {/* Book description */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10
            }}
          >
            {/* Views */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <FontAwesome
                name="eye"
                size={16}
                color="gray"
                style={{
                  marginRight: 5
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: 'gray'
                }}
              >
                {book.views}
              </Text>
            </View>

            {/* Likes */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <FontAwesome
                name="heart-o"
                size={16}
                color="gray"
                style={{
                  marginRight: 5
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: 'gray'
                }}
              >
                {book.likes}
              </Text>
            </View>

            {/* Chapters */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Ionicons
                name="list-outline"
                size={16}
                color="gray"
                style={{
                  marginRight: 5
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: 'gray'
                }}
              >
                {book.chapters}
              </Text>
            </View>
          </View>

          {/* Genre */}
          <View>
            <FlatList
              horizontal={true}
              data={book.genre}
              //   keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    marginRight: 8
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray'
                    }}
                  >
                    {item}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default BookItem
