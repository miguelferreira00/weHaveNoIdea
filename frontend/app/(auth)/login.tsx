import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { TextInput } from 'react-native-paper'
import { Background } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../styles/globalStyles';


const { width } = Dimensions.get('window');

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:6969/auth/login', { // Substitua pela URL da sua API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            console.error('Login response:', data);

            if (response.ok) {
                // Login bem-sucedido
                // Aqui você pode salvar o token de autenticação
                // await AsyncStorage.setItem('authToken', data.token);
                router.push('/');
                Alert.alert('Sucesso', 'Login realizado com sucesso!');

            } else if (response.status === 401) {
                // Erro de login
                Alert.alert('Erro', data.message || 'Credenciais inválidas');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro de conexão com o servidor');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
                <View style={styles.underText} />
                <TextInput
                    className='emailBox'
                    label={'Email'}
                    value={email}
                    onChangeText={setEmail}
                    mode='outlined'
                    keyboardType='email-address'
                    style={styles.inputBox}
                    theme={{roundness: 20}}
                />
                <TextInput
                    className='passwordBox'
                    label={'Password'}
                    value={password}
                    onChangeText={setPassword}
                    mode='outlined'
                    secureTextEntry={true}
                    keyboardType='default'
                    style={styles.inputBox}
                    theme={{roundness: 20}}
                    
                />
                <TouchableOpacity 
                    onPress={() => router.push('/(auth)/accountRecovery')} 
                    style={styles.forgotContainer}
                    >
                    <Text style={styles.forgetPassword}>Forget Password?</Text>
                </TouchableOpacity>

                <Button
                    title={isLoading ? "Waiting..." : "Login"}
                    iconName="login"
                    onPress={handleLogin}
                    style={{ width: 260, marginTop: 20 }}
                />

                {/* Divisor */}
                <View style={styles.divisorLogin} />

        
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
        width: 210,
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
        backgroundColor: 'transparent',
        borderRadius: 30,
        color: 'black',
    },

    forgotContainer: {
        alignSelf: 'flex-end',
        marginRight: '10%',
        marginTop: 8,
      },
      

    forgetPassword: {
        color: 'gray',
        textDecorationLine: 'none', 
        fontWeight:'bold',
        fontSize: 13,
    },

    divisorLogin: {
        width: 170,
        height: 3,
        backgroundColor: 'gray',
        borderRadius: 10,
        marginTop: 40,
        alignSelf: 'center',
    },
});
