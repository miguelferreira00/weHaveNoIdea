import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from '../styles/globalStyles';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack
	  screenOptions={{
		headerShown: false,
	  }}
	>
	  {/* Define the initial route */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Index',
        }}
      />
      <Stack.Screen
        name="login"
        options={{
        }}
		  />
      <Stack.Screen
        name="sign_up"
        options={{
        }}
		  />
    </Stack>
  );
}
