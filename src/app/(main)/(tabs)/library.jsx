import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import TabBar from '@/components/tabBar/index'
import BookGridList from '@/components/bookGridList/index'

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState('History')

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          margin: 16
        }}
      >
        Library
      </Text>

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'History' && <BookGridList type="history" />}
      {activeTab === 'Liked' && <BookGridList type="liked" />}
      {activeTab === 'Saved' && <BookGridList type="saved" />}
    </View>
  )
}
