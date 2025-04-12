import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

const notifications = [
  { id: '1', title: 'Message', time: 'Yesterday at 6:01 AM' },
  { id: '2', title: 'Message', time: 'Yesterday at 6:01 AM' },
  { id: '3', title: 'Message', time: 'Yesterday at 6:01 AM' }
]

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <View style={styles.divider} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5' // giống màu nền trong ảnh
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 12
  }
})
