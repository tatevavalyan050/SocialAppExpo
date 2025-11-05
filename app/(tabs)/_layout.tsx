import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true, tabBarActiveTintColor: '#2563eb' }}>
      <Tabs.Screen name="index" options={{ title: 'Feed', tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" color={color} size={size} />) }} />
      <Tabs.Screen name="create" options={{ title: 'Create', tabBarIcon: ({ color, size }) => (<Ionicons name="add-circle-outline" color={color} size={size} />) }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved', tabBarIcon: ({ color, size }) => (<Ionicons name="bookmark-outline" color={color} size={size} />) }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" color={color} size={size} />) }} />
    </Tabs>
  );
}
