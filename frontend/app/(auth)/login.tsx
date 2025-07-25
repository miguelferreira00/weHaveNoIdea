import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { TextInput } from 'react-native-paper'
import { Background } from '@react-navigation/elements';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../styles/globalStyles';

const { width } = Dimensions.get('window');
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Fundo azul com texto */}
      <View style={styles.header}>
        <Image
            source={require('../../assets/images/test/logo.jpeg')}
            style={styles.logoImage}
            resizeMode="cover"
        />
        <Text style={styles.appName}>Rankly</Text>
      </View>


      {/* Formulário de Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <View style={styles.underText}/>
        <TextInput
            className='emailBox'
            label={'Email'}
            placeholderTextColor={'gray'}
            style={styles.inputBox}
            mode='outlined'
            value={email}
            onChangeText={emailText => setEmail(emailText)}
        />
        <TextInput
            className='passwordBox'
            placeholder='Password'
            placeholderTextColor={'gray'}
            style={styles.inputBox}
            value={password}
            onChangeText={passwordText => setEmail(passwordText)}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7886C7',
    },
  
    header: {
        backgroundColor: '#7886C7',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40, // Adiciona espaço no topo
    },

    logoImage: {
        width: 110,
        height: 110,
        marginBottom: 16,
        borderRadius: 35,
        borderColor: '#AD5CC9',
        borderWidth: 2,
    },

    appName: {
        fontFamily: 'PressStart2P',
        color: 'white',
        textShadowColor: '#AD5CC9',
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 1,
        fontSize: 30,
        textAlign: 'center',    
        marginTop: 10,  
    },
  
    title: {
        color: '#2D336B',
        fontSize: 22,
        fontFamily: 'PressStart2P',
        textShadowColor: Colors.primary,
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 1,
        marginTop: 0,
    },

    underText: {
        width: 130,
        height: 5,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
  
    loginContainer: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },

    inputBox: {
        marginTop: 20,
        width: '80%',
        height: 60,
        backgroundColor: '#D3D3D3',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        fontSize: 20,
    }
  });
  