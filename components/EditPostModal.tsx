import { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

export default function EditPostModal({ visible, initialText, onSave, onCancel }: { visible: boolean; initialText: string; onSave: (text: string) => void; onCancel: () => void; }) {
  const [text, setText] = useState(initialText);
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Post</Text>
          <TextInput value={text} onChangeText={setText} style={styles.input} multiline />
          <View style={styles.row}>
            <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel}><Text style={styles.cancelText}>Cancel</Text></Pressable>
            <Pressable style={[styles.btn, styles.save]} onPress={() => onSave(text.trim())}><Text style={styles.saveText}>Save</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  card: { width: '86%', backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 10, minHeight: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 10, marginTop: 12 },
  btn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  cancel: { backgroundColor: '#eee' },
  save: { backgroundColor: '#2563eb' },
  cancelText: { color: '#222', fontWeight: '700' },
  saveText: { color: '#fff', fontWeight: '800' },
});


