import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { usePosts } from '@/context/PostContext';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/PrimaryButton';

export default function ProfileScreen() {
  const { posts, clearPosts } = usePosts();
  const { user } = useUser();
  const router = useRouter();
  const myPosts = posts.filter(p => p.user === user.name || p.user === 'You');
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  return (
    <View style={styles.container}>
      {user.avatarUrl ? (
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      ) : (
        <Image source={require('@/assets/images/icon.png')} style={styles.avatar} />
      )}
      <Text style={styles.name}>{user.name || 'You'}</Text>
      {!!user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      <Text>Posts: {myPosts.length}</Text>
      <Text>Total Likes: {totalLikes}</Text>
      <View style={{ height: 12 }} />
      <PrimaryButton title="Edit Profile" onPress={() => router.push('/profile/edit')} />
      <View style={{ height: 8 }} />
      <PrimaryButton title="Clear Feed" onPress={async () => { await clearPosts(); Alert.alert('Cleared', 'All saved posts have been removed.'); }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  bio: { color: '#555', marginBottom: 10 },
});
