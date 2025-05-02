import React from 'react'
import { FlatList } from 'react-native'
import BookItem from './bookItem'
import { Book } from '@/types'

type BookListVerticalProps = {
  books: Book[]
}

const BookListVertical: React.FC<BookListVerticalProps> = ({ books }) => {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BookItem book={item} />}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default BookListVertical
