import { TouchableOpacity, Image, Text, View } from 'react-native'
import { useRouter } from 'expo-router'

const BookItem = ({ book }) => {
  const router = useRouter()

  const handleSelectBook = (bookId) => {
    router.push(`/bookReader/${bookId}`)
  }

  const truncateTitle = (title, maxWords = 3) => {
    const words = title.split(' ')
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : title
  }

  return (
    <TouchableOpacity onPress={() => handleSelectBook(book.id)}>
      <View
        style={{
          width: 112,
          height: 186,
          margin: 4
        }}
      >
        <Image
          source={{
            uri:
              book.image ||
              'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
          }}
          style={{
            // width: '100%',
            // height: '90%'
            width: 112,
            height: 168
          }}
        />
        {/* <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 100 }}>
          {book.title}
        </Text> */}

        <Text>{truncateTitle(book.title)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BookItem
