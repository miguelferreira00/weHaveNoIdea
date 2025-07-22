import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { GlobalStyles } from '../styles/globalStyles';
import { Button, Card } from '../components/ui';

export default function Index() {
  return (
    <ScrollView style={GlobalStyles.container}>
      <View style={GlobalStyles.center}>
        <Text style={GlobalStyles.title}>Bem-vindo ao Rankly!</Text>
        <Text style={[GlobalStyles.textLight, { textAlign: 'center', marginBottom: 30 }]}>
          Participe de desafios e suba no ranking
        </Text>

        <Card title="Acesso Rápido" variant="primary">
          <Button
            title="Entrar no App"
            variant="primary"
            size="large"
            onPress={() => router.push('/(tabs)/home')}
          />

          <Button
            title="Fazer Login"
            variant="secondary"
            onPress={() => router.push('/(auth)/login')}
          />

          <Button
            title="Criar Conta"
            variant="outline"
            onPress={() => router.push('/(auth)/sign_up')}
          />
        </Card>

        <Card title="Sobre o Rankly">
          <Text style={GlobalStyles.text}>
            Uma plataforma onde você pode participar de desafios incríveis,
            competir com outros usuários e subir no ranking global!
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}