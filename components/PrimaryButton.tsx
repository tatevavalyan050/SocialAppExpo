import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

export default function PrimaryButton({ title, onPress, style, textStyle, disabled }: { title: string; onPress: () => void; style?: ViewStyle; textStyle?: TextStyle; disabled?: boolean; }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.btn, disabled && styles.disabled, style]}
      accessibilityRole="button"
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.6,
  },
});


