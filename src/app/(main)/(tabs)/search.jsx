import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const books = [
  {
    id: '1',
    title: 'Book One',
    author: 'Author A',
    likes: 10,
    categories: ['Fiction', 'Adventure'],
    image: 'https://picsum.photos/60/90?random=1'
  },
  {
    id: '2',
    title: 'Book Two',
    author: 'Author B',
    likes: 5,
    categories: ['Science', 'Non-fiction'],
    image: 'https://picsum.photos/60/90?random=2'
  },
  {
    id: '3',
    title: 'Book Three',
    author: 'Author C',
    likes: 8,
    categories: ['Fantasy'],
    image: 'https://picsum.photos/60/90?random=3'
  },
  {
    id: '4',
    title: 'Book Four',
    author: 'Author D',
    likes: 2,
    categories: ['History', 'Biography', 'War'],
    image: 'https://picsum.photos/60/90?random=4'
  }
]

export default function SearchScreen() {
  const [likeCounts, setLikeCounts] = useState(books)

  const handleLike = (id) => {
    const updated = likeCounts.map((book) =>
      book.id === id ? { ...book, likes: book.likes + 1 } : book
    )
    setLikeCounts(updated)
  }

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>

        {/* Like + Count */}
        <View style={styles.likeRow}>
          <TouchableOpacity
            onPress={() => handleLike(item.id)}
            style={styles.likeButton}
          >
            <FontAwesome name="heart" size={18} color="red" />
          </TouchableOpacity>
          <Text style={styles.likeCount}>{item.likes}</Text>
        </View>

        {/* Categories */}
        <View style={styles.categoryRow}>
          {item.categories.map((cat, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <FontAwesome
          name="search"
          size={18}
          color="#555"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#555"
          style={styles.searchInput}
        />
      </View>

      {/* Book list */}
      <FlatList
        data={likeCounts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16
  },
  listContent: {
    paddingBottom: 20
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 20
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ccc'
  },
  bookInfo: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  author: {
    fontSize: 14,
    color: '#666'
  },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  likeButton: {
    marginRight: 6
  },
  likeCount: {
    fontSize: 14
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  categoryTag: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6
  },
  categoryText: {
    fontSize: 12,
    color: '#333'
  }
})
