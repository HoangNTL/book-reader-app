import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function BookItem({ book }) {
  return (
    <View style={styles.container}>
      {/* Book Cover */}
      <Image
        source={{
          uri:
            book.imageUrl ||
            'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg'
        }}
        style={styles.image}
      />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.likes}>♥ {book.likes || 0}</Text>

        {/* Genres */}
        <View style={styles.genresContainer}>
          {book.genres?.map((genre, index) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff'
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#ddd'
  },
  info: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  author: {
    fontSize: 14,
    color: '#666'
  },
  likes: {
    fontSize: 12,
    color: '#999',
    marginTop: 4
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8
  },
  genreTag: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  genreText: {
    fontSize: 12,
    color: '#555'
  }
})
