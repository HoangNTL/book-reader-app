import React, { useState, useEffect } from 'react'
import { View, TextInput } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BookListVertical from '@/components/bookListVertical'
import { supabase } from '@/lib/supabase'

type Genre = {
  id: number,
  name: string
}

type Book = {
  id: string,
  title: string,
  author: string,
  views: number,
  likes: number,
  chapters: number,
  genres: Genre[],
  image: string
}

export default function SearchScreen() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select(
        'id, title, author, views_count, total_likes, total_chapters, cover_image, book_genres (genre_id), genres (id, name)'
      )
      .eq('is_deleted', false)

    if (error) {
      console.error('Error fetching books:', error)
      return
    }

    // Chuyển đổi dữ liệu thành định dạng mong muốn
    const formattedBooks: Book[] = (data || []).map((book: any) => {
      const genres: Genre[] = book.genres.map((bg: any) => ({
        id: bg.id,
        name: bg.name
      }))

      return {
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        views: book.views_count,
        likes: book.total_likes,
        chapters: book.total_chapters,
        genres: genres,
        image: book.cover_image
      }
    })

    setBooks(formattedBooks)
  }

  return (
    <View
      style={{
        flex: 1,
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
        <BookListVertical books={books} />
      </View>
    </View>
  )
}
