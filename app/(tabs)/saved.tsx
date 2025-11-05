import { View, FlatList, StyleSheet, Text } from 'react-native';
import { usePosts } from '@/context/PostContext';
import PostItem from '@/components/PostItem';

export default function SavedScreen() {
  const { posts } = usePosts();
  const saved = posts.filter(p => p.bookmarked);
  return (
    <View style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <PostItem post={item} />}
        contentContainerStyle={saved.length === 0 ? styles.emptyWrap : { paddingVertical: 6 }}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No saved posts</Text>
            <Text style={styles.emptySub}>Tap the bookmark icon on a post to save it here.</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyWrap: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  empty: { alignItems: 'center', gap: 6 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptySub: { color: '#666' },
});


