import React, { useEffect, useLayoutEffect } from 'react'
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
import { useBookStore } from '@/store/bookStore'
import { supabase } from '@/lib/supabase'
import { Book, Genre } from '@/types'

export default function BookDetailScreen() {

  const { selectedBook, setSelectedBook } = useBookStore()

  const { id } = useLocalSearchParams()

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const router = useRouter()

  const handleReadBook = () => {
    router.push({
      pathname: '/bookReader/[id]',
      params: {
        id: id.toString(),
        title: selectedBook?.title
      }
    })
  }

  useEffect(() => {
    fetchBookDetail(id.toString())
  }, [])

  const fetchBookDetail = async (bookId: string) => {
    const { data, error } = await supabase
      .from('books')
      .select(`
        id, title, author, views_count, total_likes, total_chapters,
        cover_image, description,
        book_genres (
          genres (
            id, name
          )
        )
      `)
      .eq('id', bookId)
      .single()

    if (error) {
      console.error('Error fetching book detail:', error)
      return
    }

    const genres: Genre[] = data?.book_genres?.map((bg: any) => ({
      id: bg.genres.id,
      name: bg.genres.name
    }))

    const formattedBook: Book = {
      id: data.id.toString(),
      title: data.title,
      author: data.author,
      views: data.views_count,
      likes: data.total_likes,
      chapters: data.total_chapters,
      genres: genres,
      image: data.cover_image,
      description: data.description
    }

    setSelectedBook(formattedBook)
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
        <TouchableOpacity onPress={() => router.back()}>
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
          {selectedBook?.title}
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
                selectedBook?.image ||
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
            {selectedBook?.title}
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
          <Text>{selectedBook?.author}</Text>
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
                {selectedBook?.views} Reads
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
                {selectedBook?.likes} Likes
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
                {selectedBook?.chapters} Chapters
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
                onPress={handleReadBook}
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
            data={selectedBook?.genres}
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
                  {item.name}
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
            {selectedBook?.description ||
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
