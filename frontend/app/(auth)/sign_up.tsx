import React, { useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet, Animated, Alert } from 'react-native';
import { Button } from '../../components/ui/Button';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    // Refs para animação de tremor
    const usernameShakeAnimation = useRef(new Animated.Value(0)).current;
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

    const handleSignUp = async () => {
        // Reset de TODOS os erros
        setEmailError(false);
        setPasswordError(false);
        setUsernameError(false); // Adicione esta linha

        let hasError = false;

        if (!username || username.length < 3) {
            setUsernameError(true);
            shakeAnimation(usernameShakeAnimation);
            hasError = true;
        }

        if (!email) {
            setEmailError(true);
            shakeAnimation(emailShakeAnimation);
            hasError = true;
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            shakeAnimation(passwordShakeAnimation);
            hasError = true;
        }

        if (hasError) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://rankly-9jlj.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username
                }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('authToken', data.token);
                // mostrar api token no console
                console.log('API Token:', data.token);
                router.push('/(tabs)/home');
            } else if (response.status === 400) {
                Alert.alert('Error', data.message || 'An error occurred while signing up.');
            }
            else {
                Alert.alert('Error', 'Unexpected error occurred. Please try again later.');
            }

        } catch (error) {
            Alert.alert('Error', 'An error occurred while signing up. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <View>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <AntDesign
                    name="arrowleft" size={50} color="#2D336B"
                />
            </Pressable>
            <Text style={styles.title}>Let the <Text style={styles.textHighlight}> Competition </Text>
                begin.</Text>


            <View style={styles.inputContainer}>

                <Animated.View style={[
                    { transform: [{ translateX: usernameShakeAnimation }] },
                    { width: '80%' }
                ]}>
                    <TextInput
                        className='usernameBox'
                        label={'Username'}
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                            if (usernameError) setUsernameError(false);
                        }}
                        mode='outlined'
                        style={[
                            styles.inputBox,
                            usernameError && styles.inputError
                        ]}
                        theme={{
                            roundness: 20,
                            colors: {
                                outline: usernameError ? '#FF4444' : Colors.primary,
                                primary: usernameError ? '#FF4444' : Colors.primary,
                            }
                        }}
                        error={usernameError}
                    />
                    {usernameError && (
                        <Text style={styles.errorMessage}>
                            Please enter a valid username (at least 3 characters)
                        </Text>
                    )}
                </Animated.View>

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
                            Your password must be at least 6 characters long
                        </Text>
                    )}
                </Animated.View>

                <Button
                    title={isLoading ? "Waiting..." : "Sign Up"}
                    iconName="login"
                    onPress={handleSignUp}
                    style={{ width: 260, marginTop: 20 }}
                />

            </View>
        </View>





    )
}

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: 'transparent',
        height: 60,
        width: 60,
        marginTop: 70,
        marginLeft: 30,

    },

    title: {
        fontFamily: 'PressStart2P',
        lineHeight: 40,
        color: '#2D336B',
        fontSize: 23,
        marginTop: 10,
        marginLeft: 30,
    },

    textHighlight: {
        color: '#AD5CC9',
        textShadowColor: '#AD5CC9',
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 1,
        textDecorationLine: 'underline',
    },

    inputContainer: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
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



});