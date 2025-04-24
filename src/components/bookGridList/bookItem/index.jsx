import { TouchableOpacity, Image, Text, View } from 'react-native'
import { useRouter } from 'expo-router'

const BookItem = ({ book }) => {
  const router = useRouter()

  const handleSelectBook = (bookId) => {
    router.push(`/bookReader/${bookId}`)
  }

  return (
    <TouchableOpacity onPress={() => handleSelectBook(book.id)}>
      <View
        style={{
          width: 100,
          height: 150,
          margin: 5
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
            height: '100%'
          }}
        />
        <Text>{book.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BookItem
