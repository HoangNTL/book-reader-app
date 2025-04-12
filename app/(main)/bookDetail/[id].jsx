import React, { useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

export default function BookDetailScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const book = {
    title: 'Chairs',
    author: 'VictoriaMarieS',
    reads: '701K',
    votes: '23.5K',
    parts: '14',
    image: 'https://i.imgur.com/I80W1Q0.png',
    tags: ['death', 'horror', 'kidnapping', 'love'],
    description:
      '"Okay, where do you want me to start?" "Anywhere you wish." "There were five of us. Dani, Elizabeth, Audrey, Taylor and me. We spent about 9 months in the basement..."'
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Book cover */}
      <Image source={{ uri: book.image }} style={styles.coverImage} />

      {/* Title & Author */}
      <Text style={styles.title}>{book.title}</Text>
      <View style={styles.authorRow}>
        <Text style={styles.author}>{book.author}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Ionicons name="eye-outline" size={18} />
          <Text style={styles.statText}>{book.reads} Reads</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="heart-outline" size={18} />
          <Text style={styles.statText}>{book.votes} Likes</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="list-outline" size={18} />
          <Text style={styles.statText}>{book.parts} Chapters</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Ionicons name="book-outline" size={18} color="#fff" />
          <Text style={styles.primaryBtnText}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Ionicons name="add-outline" size={18} color="#000" />
          <Text style={styles.secondaryBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Genre */}
      <Text style={styles.sectionTitle}>Genre</Text>
      <View style={styles.tagRow}>
        {book.tags.map((tag, idx) => (
          <Text key={idx} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>{book.description}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  coverImage: {
    width: 160,
    height: 230,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  author: {
    fontSize: 16,
    color: '#555',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#444',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  primaryBtn: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    minWidth: 140,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 15,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    minWidth: 140,
  },
  secondaryBtnText: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginTop: 12,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 13,
    color: '#333',
  },
  descriptionBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    minHeight: 100,
    backgroundColor: '#fafafa',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
})
