import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';


SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('app/assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Mostra nada enquanto a fonte não carrega
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="sign_up" />
      <Stack.Screen name="accountRecovery" />
    </Stack>
  );
}