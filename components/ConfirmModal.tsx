import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

type ConfirmModalProps = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {!!message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.row}>
            <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel} accessibilityRole="button">
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.danger]} onPress={onConfirm} accessibilityRole="button">
              <Text style={styles.dangerText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  card: { width: "82%", backgroundColor: "#fff", borderRadius: 12, padding: 18 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  message: { color: "#444", marginBottom: 16, lineHeight: 20 },
  row: { flexDirection: "row", gap: 10 },
  btn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  cancel: { backgroundColor: "#eee" },
  danger: { backgroundColor: "#e11d48" },
  cancelText: { color: "#222", fontWeight: "600" },
  dangerText: { color: "#fff", fontWeight: "700" },
});
