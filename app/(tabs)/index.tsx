import { View, FlatList, StyleSheet, Text, TextInput, RefreshControl } from 'react-native';
import { usePosts } from '@/context/PostContext';
import PostItem from '@/components/PostItem';
import { useState, useMemo, useCallback } from 'react';
import type { Post } from '@/types';

export default function FeedScreen() {
  const { posts } = usePosts();
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(p => p.text.toLowerCase().includes(q) || p.user.toLowerCase().includes(q));
  }, [posts, query]);
  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search posts or users"
          style={styles.search}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={useCallback((it: Post) => it.id.toString(), [])}
        renderItem={useCallback(({ item }: { item: Post }) => <PostItem post={item} />, [])}
        contentContainerStyle={posts.length === 0 ? styles.emptyWrap : { paddingVertical: 6 }}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 500); }} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptySub}>Create your first post from the Create tab.</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchWrap: { paddingHorizontal: 12, paddingTop: 10 },
  search: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#fff' },
  emptyWrap: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  empty: { alignItems: 'center', gap: 6 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptySub: { color: '#666' },
});
