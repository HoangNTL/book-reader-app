import React from 'react'
import { FlatList } from 'react-native'
import BookItem from './bookItem'
import { Book } from '@/types'

type BookListVerticalProps = {
  books: Book[]
}

const BookListVertical: React.FC<BookListVerticalProps> = ({ books }) => {

  // const books = [
  //   {
  //     id: '1',
  //     title: 'The Great Gatsby',
  //     author: 'F. Scott Fitzgerald',
  //     views: 100,
  //     likes: 100,
  //     chapters: 10,
  //     genre: ['Fiction', 'Classic'],
  //     image:
  //       'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
  //   },
  //   {
  //     id: '2',
  //     title: 'To Kill a Mockingbird',
  //     author: 'Harper Lee',
  //     views: 200,
  //     likes: 200,
  //     chapters: 20,
  //     genre: ['Fiction', 'Classic', 'Drama'],
  //     image:
  //       'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
  //   },
  //   {
  //     id: '3',
  //     title: '1984',
  //     author: 'George Orwell',
  //     views: 300,
  //     likes: 123,
  //     chapters: 15,
  //     genre: ['Fiction', 'Dystopian'],
  //     image:
  //       'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
  //   },
  //   {
  //     id: '4',
  //     title: 'Pride and Prejudice',
  //     author: 'Jane Austen',
  //     views: 456,
  //     likes: 456,
  //     chapters: 12,
  //     genre: ['Fiction', 'Romance'],
  //     image:
  //       'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
  //   },
  //   {
  //     id: '5',
  //     title: 'Pride and Prejudice',
  //     author: 'Jane Austen',
  //     views: 456,
  //     likes: 456,
  //     chapters: 12,
  //     genre: ['Fiction', 'Romance'],
  //     image:
  //       'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
  //   },
  //   {
  //     id: '6',
  //     title: 'Pride and Prejudice',
  //     author: 'Jane Austen',
  //     views: 456,
  //     likes: 456,
  //     chapters: 12,
  //     genre: ['Fiction', 'Romance'],
  //     image:
  //       'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
  //   },
  //   {
  //     id: '7',
  //     title: 'Pride and Prejudice',
  //     author: 'Jane Austen',
  //     views: 456,
  //     likes: 456,
  //     chapters: 12,
  //     genre: ['Fiction', 'Romance'],
  //     image:
  //       'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
  //   },
  //   {
  //     id: '8',
  //     title: 'Pride and Prejudice',
  //     author: 'Jane Austen',
  //     views: 456,
  //     likes: 456,
  //     chapters: 12,
  //     genre: ['Fiction', 'Romance'],
  //     image:
  //       'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
  //   }
  // ]

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
