import React, { useState, useRef } from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet, Dimensions, Alert, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { TextInput } from 'react-native-paper'
import { Background } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width } = Dimensions.get('window');

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // Refs para animação de tremor
    const emailShakeAnimation = useRef(new Animated.Value(0)).current;
    const passwordShakeAnimation = useRef(new Animated.Value(0)).current;

    const shakeAnimation = (animationValue: Animated.Value) => {
        Animated.sequence([
            Animated.timing(animationValue, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(animationValue, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(animationValue, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(animationValue, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    const handleLogin = async () => {
        // Reset dos erros
        setEmailError(false);
        setPasswordError(false);

        let hasError = false;

        if (!email) {
            setEmailError(true);
            shakeAnimation(emailShakeAnimation);
            hasError = true;
        }

        if (!password) {
            setPasswordError(true);
            shakeAnimation(passwordShakeAnimation);
            hasError = true;
        }

        if (hasError) {
            // Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://rankly-9jlj.onrender.com/auth/login', { 
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

            if (response.ok) {
                // Login bem-sucedido
                // Aqui você pode salvar o token de autenticação
                await AsyncStorage.setItem('authToken', data.token);
                router.push('/(tabs)/home'); // Redireciona para a página inicial após o login
                Alert.alert('Sucesso', 'Login realizado com sucesso!');

            } else if (response.status === 401) {
                // Erro de login
                Alert.alert('Error', data.message || 'Credenciais inválidas');
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

                <Animated.View style={[
                    { transform: [{ translateX: emailShakeAnimation }] },
                    { width: '80%' }
                ]}>
                    <TextInput
                        className='emailBox'
                        label={'Email'}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (emailError) setEmailError(false);
                        }}
                        mode='outlined'
                        keyboardType='email-address'
                        style={[
                            styles.inputBox,
                            emailError && styles.inputError
                        ]}
                        theme={{
                            roundness: 20,
                            colors: {
                                outline: emailError ? '#FF4444' : Colors.primary,
                                primary: emailError ? '#FF4444' : Colors.primary,
                            }
                        }}
                        error={emailError}
                    />
                    {emailError && (
                        <Text style={styles.errorMessage}>
                            Please enter your email
                        </Text>
                    )}
                </Animated.View>

                <Animated.View style={[
                    { transform: [{ translateX: passwordShakeAnimation }] },
                    { width: '80%' }
                ]}>
                    <TextInput
                        className='passwordBox'
                        label={'Password'}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (passwordError) setPasswordError(false);
                        }}
                        mode='outlined'
                        secureTextEntry={true}
                        keyboardType='default'
                        style={[
                            styles.inputBox,
                            passwordError && styles.inputError
                        ]}
                        theme={{
                            roundness: 20,
                            colors: {
                                outline: passwordError ? '#FF4444' : Colors.primary,
                                primary: passwordError ? '#FF4444' : Colors.primary,
                            }
                        }}
                        error={passwordError}
                    />
                    {passwordError && (
                        <Text style={styles.errorMessage}>
                            Please enter your password
                        </Text>
                    )}
                </Animated.View>

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
        fontSize: 38,
        textAlign: 'center',
        marginTop: 0,
    },

    title: {
        color: '#2D336B',
        fontSize: 22,
        fontFamily: 'PressStart2P',
        textShadowColor: Colors.primary,
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 3,
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
        width: '100%',
        height: 60,
        backgroundColor: 'transparent',
        borderRadius: 30,
        color: 'black',
        borderColor: Colors.primary,
    },

    inputError: {
        marginTop: 20,
        width: '100%',
        height: 60,
        backgroundColor: 'transparent',
        borderRadius: 30,
        borderColor: Colors.warning,
    },

    errorMessage: {
        color: '#FF4444',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 15,
        fontWeight: '500',
    },

    forgotContainer: {
        alignSelf: 'flex-end',
        marginRight: '10%',
        marginTop: 8,
    },


    forgetPassword: {
        color: 'gray',
        textDecorationLine: 'none',
        fontWeight: 'bold',
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
