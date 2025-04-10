import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>BookApp</Text>
        <Image
          source={{ uri: 'https://i.pravatar.cc/40' }} // Thay bằng URL ảnh avatar 
          style={styles.avatar}
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Hottest */}
        <Text style={styles.sectionTitle}>Hottest</Text>
        <View style={styles.bookRow}>
          <View style={styles.bookCard} />
          <View style={styles.bookCard} />
          <View style={styles.bookCard} />
        </View>

        {/* Newest */}
        <Text style={styles.sectionTitle}>Newest</Text>
        <View style={styles.bookRow}>
          <View style={styles.bookCard} />
          <View style={styles.bookCard} />
          <View style={styles.bookCard} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bookCard: {
    width: 100,
    height: 140,
    backgroundColor: '#ddd',
    borderRadius: 12,
  },
})
