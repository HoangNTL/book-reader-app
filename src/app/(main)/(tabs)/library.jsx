import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import TabBar from '@/components/library/TabBar'
import BookList from '@/components/library/BookList'
import { useRouter } from 'expo-router'

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState('History')
  const router = useRouter()

  const handleSelectBook = (bookId) => {
    router.push(`/reader/${bookId}`)
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>
        Library
      </Text>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'History' && <BookList type="history" onPress={handleSelectBook} />}
      {activeTab === 'Liked' && <BookList type="liked" onPress={handleSelectBook} />}
      {activeTab === 'Saved' && <BookList type="saved" onPress={handleSelectBook} />}
    </View>
  )
}
