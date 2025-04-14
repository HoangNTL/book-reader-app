import { View, TouchableOpacity, Text } from 'react-native'

const tabs = ['History', 'Liked', 'Saved']

export default function TabBar({ activeTab, setActiveTab }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#eee',
        borderRadius: 8,
        margin: 10
      }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: activeTab === tab ? '#ccc' : 'transparent',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontWeight: activeTab === tab ? 'bold' : 'normal' }}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
