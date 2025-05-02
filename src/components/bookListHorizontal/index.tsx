import React from 'react'
import { FlatList } from 'react-native'
import BookItem from './bookItem'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Book } from '@/types/index'
import { Genre } from '@/types/index'

type BookListHorizontalProps = {
  type: 'topViewed' | 'latestUpdated';
}

const BookListHorizontal: React.FC<BookListHorizontalProps> = ({ type }) => {
  const [books, setBooks] = useState<Book[]>([])

  const fetchBooks = async () => {
    let data: any[] | null = null
    let error: any = null

    if (type === 'topViewed') {
      const res = await supabase
        .from('books')
        .select('id, title, cover_image')
        .eq('is_deleted', false)
        .order('views_count', { ascending: false })
        .limit(10)

      data = res.data
      error = res.error
    } else if (type === 'latestUpdated') {
      const res = await supabase
        .from('books')
        .select('id, title, cover_image')
        .eq('is_deleted', false)
        .order('updated_at', { ascending: false })
        .limit(10)

      data = res.data
      error = res.error
    }

    if (error) {
      console.error('Lỗi khi tải sách từ Supabase:', error)
      return
    }

    const formattedBooks: Book[] = (data ?? []).map((book: any) => ({
      id: book.id.toString(),
      title: book.title,
      image: book.cover_image,
      author: '',
      views: 0,
      likes: 0,
      chapters: 0,
      genres: []
    }))

    setBooks(formattedBooks)
  }

  useEffect(() => {
    fetchBooks()
  }, [type])


  return (
    <FlatList
      data={books}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BookItem book={item} />}
      // contentContainerStyle={{
      //   paddingHorizontal: 16
      // }}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default BookListHorizontal
