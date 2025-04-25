import React, { useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'

export default function BookDetailScreen() {
  const books = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      views: 100,
      likes: 100,
      chapters: 10,
      genre: ['Fiction', 'Classic'],
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      views: 200,
      likes: 200,
      chapters: 20,
      genre: ['Fiction', 'Classic', 'Drama'],
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      views: 300,
      likes: 123,
      chapters: 15,
      genre: ['Fiction', 'Dystopian'],
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      views: 456,
      likes: 456,
      chapters: 12,
      genre: ['Fiction', 'Romance'],
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '5',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      views: 456,
      likes: 456,
      chapters: 12,
      genre: ['Fiction', 'Romance'],
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '6',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      views: 456,
      likes: 456,
      chapters: 12,
      genre: ['Fiction', 'Romance'],
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '7',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      views: 456,
      likes: 456,
      chapters: 12,
      genre: ['Fiction', 'Romance'],
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '8',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      views: 456,
      likes: 456,
      chapters: 12,
      genre: ['Fiction', 'Romance'],
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    }
  ]

  const { id } = useLocalSearchParams()

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const book = books.find((b) => b.id === id) || books[0]

  const router = useRouter()

  const handleReadBook = (bookId) => {
    router.push(`/bookReader/${bookId}`)
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1
      }}
    >
      {/* Header */}
      <View
        style={{
          // height: 40,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={{ marginRight: 16 }}
            name="arrow-back"
            size={24}
            color="black"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}
        >
          {book.title}
        </Text>
      </View>

      <View>
        {/* Book Cover */}
        <View
          style={{
            backgroundColor: 'gray',
            height: 200,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12
          }}
        >
          <Image
            source={{
              uri:
                book.image ||
                'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
            }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }}
          />
        </View>

        {/* Book Title */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12
          }}
        >
          <Text
            style={{
              fontSize: 20
            }}
          >
            {book.title}
          </Text>
        </View>

        {/* Book Author */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12
          }}
        >
          <Text>{book.author}</Text>
        </View>

        {/* Book Views, likes, chapters*/}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 18
          }}
        >
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
                {book.views} Reads
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
                {book.likes} Likes
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
                {book.chapters} Chapters
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              marginBottom: 12
            }}
          >
            {/* Read button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16
              }}
            >
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  gap: 4,
                  backgroundColor: '#000',
                  borderRadius: 24,
                  paddingHorizontal: 48,
                  paddingVertical: 8
                }}
                onPress={() => handleReadBook(book.id)}
              >
                <Ionicons name="book-outline" size={18} color="#fff" />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16
                  }}
                >
                  Read
                </Text>
              </TouchableOpacity>
            </View>

            {/* Add to Library button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16
              }}
            >
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  gap: 4,
                  backgroundColor: '#fff',
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 24,
                  paddingHorizontal: 48,
                  paddingVertical: 8
                }}
              >
                <Ionicons name="add-outline" size={18} color="#000" />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Genre */}
        <View
          style={{
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            marginBottom: 24,
            paddingHorizontal: 16
          }}
        >
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              marginBottom: 4
            }}
          >
            Genre
          </Text>
          <FlatList
            horizontal={true}
            data={book.genre}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: 20,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginRight: 8
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'gray'
                  }}
                >
                  {item}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Description */}
        <View
          style={{
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            marginBottom: 24,
            paddingHorizontal: 16
          }}
        >
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              marginBottom: 4
            }}
          >
            Description
          </Text>
          <Text
            style={{
              fontSize: 14,
              borderRadius: 8,
              borderColor: '#f0f0f0',
              borderWidth: 1,
              padding: 8
              // marginBottom: 24
            }}
          >
            {book.description ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
          </Text>
        </View>

        {/* Chapters */}
        {/* <View>
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              marginBottom: 4,
              paddingHorizontal: 16
            }}
          >
            Chapters
          </Text>
          <FlatList
            data={[...Array(10).keys()]}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0'
                }}
              >
                <Text>Chapter {item + 1}</Text>
              </View>
            )}
          />
        </View> */}
      </View>
    </View>
  )
}
