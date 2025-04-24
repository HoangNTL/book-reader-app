import { FlatList, View } from 'react-native'
import BookItem from './bookItem'

const BookListGrid = ({ type }) => {
  const books = [
    {
      id: '1',
      title: 'The Great Gatsby',
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '3',
      title: '1984',
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
    }
  ]

  return (
    <View
      style={{
        flex: 1,
        padding: 16
      }}
    >
      <FlatList
        numColumns={3}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  )
}

export default BookListGrid
