import React from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Background } from '@react-navigation/elements';
import { Button } from '../../components/ui/Button';

export default function Login() {
  return (
    <View style={styles.background}>
        {/* Botões */}
          
        {/* Relevo */}
        <Image
            source={require('../../assets/images/test/relevoAzulEscuro.png')}
            style={styles.relevoImage}
        />

        <Button 
            title='' 
            iconName='left'
            style={styles.button}
            onPress={() => router.back()} 
        />
        


        <View style={styles.container}>
            {/* Texto Boas-Vindas */}
            <Text style={styles.welcomeText}> Welcome Back </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        marginTop: '40%',
    },

    background: {
        flex:1,
        backgroundColor: '#7886C7',
    },

    button:{
        position: 'absolute',
        backgroundColor: '#2D336B',
        marginTop: 80,
        marginLeft: 30,
        transform: [{ scale: 1.5 }],
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 1,
    },

    relevoImage:{
        position: 'absolute',
        marginTop: -80,
        marginLeft: 160,
        width: '100%',
        height: 200,
        transform: [{ scale: 4 }, ],
        resizeMode: 'contain',
    },

    welcomeText: {
        fontFamily: 'PressStart2P',
        position: 'absolute',
        color: '#99',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -480,
        marginLeft: -150,
    }
});