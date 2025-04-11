import { FlatList } from 'react-native'
import BookItem from './BookItem'

export default function BookList({ type, onPress }) {
  const books = getMockBooks(type)

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookItem book={item} onPress={onPress} />
      )}
    />
  )
}

function getMockBooks(type) {
  return [
    {
      id: '1',
      title: `Book from ${type}`,
      author: 'Author A',
      genres: ['Fantasy', 'Adventure'],
      liked: true,
      saved: false,
      likes: 120
    },
    {
      id: '2',
      title: `Another ${type}`,
      author: 'Author B',
      genres: ['Sci-Fi', 'Thriller'],
      liked: false,
      saved: true,
      likes: 98
    },
    {
      id: '3',
      title: `Third ${type} Book`,
      author: 'Author C',
      genres: ['Romance'],
      liked: false,
      saved: false,
      likes: 45
    }
  ]
}
