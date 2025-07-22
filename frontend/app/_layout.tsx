import React from 'react';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from '../styles/globalStyles';

// Previne que a splash screen seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useEffect(() => {
		// Esconde a splash screen quando o app estiver pronto
		SplashScreen.hideAsync();
	}, []);

	return (
		<>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: Colors.primary,
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						title: 'Home',
						headerShown: true,
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
