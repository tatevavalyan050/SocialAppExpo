import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PostProvider } from "@/context/PostContext";
import { UserProvider } from "@/context/UserContext";
import { LogBox } from 'react-native';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    LogBox.ignoreLogs(['props.pointerEvents is deprecated. Use style.pointerEvents']);

  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <UserProvider>
        <PostProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </PostProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
