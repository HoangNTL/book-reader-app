import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList
} from 'react-native'
import { useRouter } from 'expo-router'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import BookListHorizontal from '@/components/bookListHorizontal'

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext)

  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace('/(auth)/login')
  }

  // const handleSelectBook = (bookId) => {
  //   router.push({
  //     pathname: `/bookDetail/${bookId}`
  //   })
  // }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 16
          // marginBottom: 20
        }}
      >
        {/* Logo */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold'
          }}
        >
          BookApp
        </Text>

        {/* Avatar */}
        <Image
          source={{ uri: 'https://i.pravatar.cc/40' }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20
          }}
        />
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text
          style={{
            fontSize: 24
          }}
        >
          Welcome, {user?.username}
        </Text>
        <Button title="Logout" onPress={handleLogout} />
      </TouchableOpacity>

      {/* Content */}
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 10,
            marginTop: 10
          }}
        >
          Hottest
        </Text>

        {/* Hottest Books */}
        <View
          style={{
            marginBottom: 20
          }}
        >
          <BookListHorizontal />
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 10,
            marginTop: 10
          }}
        >
          Newest
        </Text>

        {/* Newest Books */}
        <BookListHorizontal />
      </View>
    </View>
  )
}
