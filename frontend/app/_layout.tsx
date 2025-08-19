import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          if (route.name === 'home') iconName = 'home';
          else if (route.name === 'profile') iconName = 'person';
          else iconName = 'ellipse';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* ↓ APENAS estas 2 telas devem ficar ↓ */}
      <Tabs.Screen name="home" />
      <Tabs.Screen name="profile" />

    </Tabs>
  );
}