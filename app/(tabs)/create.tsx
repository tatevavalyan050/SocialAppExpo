import { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Haptics from 'expo-haptics';
import { usePosts } from '@/context/PostContext';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/PrimaryButton';

export default function CreatePostScreen() {
  const [text, setText] = useState('');
  const { addPost } = usePosts();
  const router = useRouter();
  const maxLen = 240;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="What's on your mind?"
        style={styles.input}
        multiline
        maxLength={maxLen}
      />
      <Text style={styles.counter}>{text.length}/{maxLen}</Text>
      <PrimaryButton
        title="Post"
        onPress={async () => {
          if (!text.trim()) return;
          addPost(text.trim());
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setText('');
          Keyboard.dismiss();
          router.replace('/(tabs)');
        }}
        disabled={!text.trim()}
      />
    </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: {
    borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
    padding: 14, marginBottom: 16, minHeight: 120, textAlignVertical: 'top', backgroundColor: '#fff'
  },
  counter: { alignSelf: 'flex-end', color: '#6b7280', marginTop: -12, marginBottom: 16 },
});
