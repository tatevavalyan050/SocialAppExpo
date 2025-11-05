import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePosts } from "@/context/PostContext";
import { useUser } from "@/context/UserContext";
import ConfirmModal from "@/components/ConfirmModal";
import EditPostModal from "@/components/EditPostModal";
import type { Post } from "@/types";

function PostItemCmp({ post }: { post: Post }) {
  const { toggleLike, deletePost, updatePost, toggleBookmark } = usePosts();
  const { user } = useUser();
  const isYou = post.user === 'You' || post.user === user.name;
  const displayName = post.user === 'You' ? (user.name || 'You') : post.user;
  const displayAvatarUri = post.avatar || (post.user === 'You' ? user.avatarUrl : undefined);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { addComment } = usePosts();
  const handleDelete = () => {
    if (post.id) deletePost(post.id);
    setShowDelete(false);
  };
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {displayAvatarUri ? (
          <Image source={{ uri: displayAvatarUri }} style={styles.avatar} />
        ) : (
          <Image source={require("@/assets/images/icon.png")} style={styles.avatar} />
        )}
        <View>
          <Text style={styles.user}>{displayName}</Text>
          <Text style={styles.time}>
            {post.createdAt || "Just now"}
          </Text>
        </View>
      </View>
      <Text style={styles.text}>{post.text}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => post.id && toggleLike(post.id)}
          style={styles.likeButton}
          accessibilityRole="button"
          accessibilityLabel={post.likedByYou ? "Unlike" : "Like"}
        >
          <Ionicons
            name={post.likedByYou ? "heart" : "heart-outline"}
            size={20}
            color={post.likedByYou ? "#e11d48" : "#555"}
          />
          <Text style={styles.likeCount}>{post.likes ?? 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => post.id && toggleBookmark(post.id)}
          style={styles.likeButton}
          accessibilityRole="button"
          accessibilityLabel={"Add bookmark"}
        >
          <Ionicons name={"bookmark-outline"} size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowComments(v => !v)}
          style={styles.likeButton}
          accessibilityRole="button"
          accessibilityLabel="Toggle comments"
        >
          <Ionicons name="chatbubble-outline" size={20} color="#555" />
          <Text style={styles.likeCount}>{post.comments?.length || 0}</Text>
        </TouchableOpacity>
        {isYou && (
          <TouchableOpacity onPress={() => setShowDelete(true)} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color="#e11d48" />
          </TouchableOpacity>
        )}
      </View>
      {isYou && (
        <TouchableOpacity onLongPress={() => setShowEdit(true)} activeOpacity={0.6}>
          <Text style={{ color: '#6b7280', fontSize: 12 }}>Long-press here to edit</Text>
        </TouchableOpacity>
      )}
      {showComments && (
        <View style={styles.commentsSection}>
          {(post.comments || []).map((c: { id: string; user: string; text: string; createdAt: string }) => (
            <View key={c.id} style={styles.commentRow}>
              <Text style={styles.commentAuthor}>{c.user}:</Text>
              <Text style={styles.commentText}>{c.text}</Text>
            </View>
          ))}
          <View style={styles.commentInputRow}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment"
              style={styles.commentInput}
            />
            <TouchableOpacity
              onPress={() => {
                if (!commentText.trim() || !post.id) return;
                addComment(post.id, commentText.trim());
                setCommentText("");
              }}
              accessibilityRole="button"
              accessibilityLabel="Send Comment"
            >
              <Ionicons name="send" size={20} color="#1d4ed8" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showDelete && (
        <ConfirmModal
          visible={showDelete}
          title="Delete post?"
          message="Are you sure you want to delete this post?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
      {showEdit && post.id && (
        <EditPostModal
          visible={showEdit}
          initialText={post.text}
          onCancel={() => setShowEdit(false)}
          onSave={(t) => { if (t) updatePost(post.id!, t); setShowEdit(false); }}
        />
      )}
    </View>
  );
}

const PostItem = React.memo(PostItemCmp);
export default PostItem;

const styles = StyleSheet.create({
  card: { padding: 16, borderBottomWidth: 1, borderColor: "#eee", backgroundColor: "#fff", borderRadius: 12, marginHorizontal: 12, marginVertical: 6, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 1 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  user: { fontWeight: "bold", fontSize: 16 },
  time: { color: "#777", fontSize: 12 },
  text: { fontSize: 15, marginBottom: 8 },
  actions: { flexDirection: "row", alignItems: "center" },
  likeButton: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, backgroundColor: "#f6f6f6" },
  likeCount: { marginLeft: 6, color: "#555" },
  deleteButton: { marginLeft: 12 },
  commentsSection: { marginTop: 8, gap: 6 },
  commentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  commentAuthor: { fontWeight: '600' },
  commentText: { flex: 1 },
  commentInputRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  commentInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
});
