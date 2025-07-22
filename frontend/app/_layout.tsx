import React, { useEffect } from 'react';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from '../styles/globalStyles';

// Previne que a splash screen seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	// const [fontsLoaded] = useFonts({
	// 	PressStart2P: require('../assets/fonts/PressStart2P-Regular.ttf'),
	//   });
	useEffect(() => {
		// Esconde a splash screen quando o app estiver pronto
		SplashScreen.hideAsync();
	}, []);

	return (
		<>
			<Stack
			>
				<Stack.Screen
					name="index"
					options={{
						title: 'Home',
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="profile"
					options={{
						title: 'Perfil',
						presentation: 'modal',
					}}
				/>
			</Stack>
		</>
	);
}
