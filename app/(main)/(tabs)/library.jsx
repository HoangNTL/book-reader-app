import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import TabBar from '@components/library/TabBar'
import BookList from '@components/library/BookList'

export default function Tab() {
  const [activeTab, setActiveTab] = useState('History')

  return (
    // <View style={styles.container}>
    //   <Text>Library screen</Text>
    // </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>
        Library
      </Text>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'History' && <BookList type="history" />}
      {activeTab === 'Liked' && <BookList type="liked" />}
      {activeTab === 'Saved' && <BookList type="saved" />}
    </View>
  )
}