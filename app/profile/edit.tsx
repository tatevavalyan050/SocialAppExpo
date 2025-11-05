import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/PrimaryButton';

export default function EditProfileScreen() {
  const { user, updateUser } = useUser();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const router = useRouter();

  return (
    <KeyboardAvoidingKeyboardWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.avatarWrap}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <Image source={require('../../assets/images/icon.png')} style={styles.avatar} />
          )}
        </View>
        <Text style={styles.helper}>Paste an image URL below to change your avatar</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Your name" style={styles.input} />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          placeholder="Tell people about yourself"
          style={[styles.input, styles.multiline]}
          maxLength={160}
          multiline
        />
        <Text style={styles.counter}>{bio.length}/160</Text>

        <Text style={styles.label}>Avatar URL</Text>
        <TextInput value={avatarUrl} onChangeText={setAvatarUrl} placeholder="https://..." style={styles.input} autoCapitalize="none" />

        <View style={{ height: 16 }} />
        <PrimaryButton
          title="Save Changes"
          onPress={async () => {
            if (!name.trim()) {
              Alert.alert('Name is required');
              return;
            }
            await updateUser({ name: name.trim(), bio: bio.trim(), avatarUrl: avatarUrl.trim() || undefined });
            Keyboard.dismiss();
            router.back();
          }}
        />
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingKeyboardWrapper>
  );
}

function KeyboardAvoidingKeyboardWrapper({ children }: { children: React.ReactNode }) {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    );
  }
  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 },
  cancel: { color: '#2563eb', fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 14 },
  avatarWrap: { alignItems: 'center', marginBottom: 8 },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  helper: { color: '#6b7280', marginBottom: 8 },
  label: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: '#fff' },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  counter: { alignSelf: 'flex-end', color: '#6b7280', marginTop: 4 },
});


