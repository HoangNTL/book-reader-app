import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'

const bookImages = [
  'https://picsum.photos/100/140?random=1',
  'https://picsum.photos/100/140?random=2',
  'https://picsum.photos/100/140?random=3',
  'https://picsum.photos/100/140?random=4',
  'https://picsum.photos/100/140?random=5',
  'https://picsum.photos/100/140?random=6',
  'https://picsum.photos/100/140?random=7',
  'https://picsum.photos/100/140?random=8',
  'https://picsum.photos/100/140?random=9',
  'https://picsum.photos/100/140?random=10'
]

export default function HomeScreen() {
  const router = useRouter()

  const handleSelectBook = (index) => {
    // const book = {
    //   title: `Book Title #${index + 1}`,
    //   image: bookImages[index]
    // }
    router.push({
      pathname: `/bookDetail/${index + 1}`
    })
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>BookApp</Text>
        <Image
          source={{ uri: 'https://i.pravatar.cc/40' }}
          style={styles.avatar}
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Hottest */}
        <Text style={styles.sectionTitle}>Hottest</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.bookRow}>
            {bookImages.map((uri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectBook(index)}
              >
                <Image source={{ uri }} style={styles.bookCard} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Newest */}
        <Text style={styles.sectionTitle}>Newest</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.bookRow}>
            {bookImages.map((uri, index) => (
              <TouchableOpacity
                key={`new-${index}`}
                onPress={() => handleSelectBook(index)}
              >
                <Image source={{ uri }} style={styles.bookCard} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 40,
    paddingHorizontal: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  content: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10
  },
  bookRow: {
    flexDirection: 'row',
    marginBottom: 20
  },
  bookCard: {
    width: 100,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#ddd',
    marginRight: 12
  }
})
