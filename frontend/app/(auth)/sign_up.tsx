import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet, TextInput } from 'react-native';
import { Button } from '../../components/ui/Button';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    return(
        <View>
            {/* Not working */}
            <Pressable style={styles.backButton} onPress={() => router.push('../app/index.tsx')}> 
                <AntDesign
                    name="arrowleft" size={50} color="#2D336B" 
                />
            </Pressable>
            <Text style={styles.title}>Let the <Text style={styles.textHighlight}> Competition </Text>
                begin.</Text>

        </View>

        
        
        
            
    )
}

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: 'transparent',
        height: 60,
        width: 60,
        marginTop: 70,
        marginLeft:30,

    },

    title: {
        fontFamily: 'PressStart2P',
        lineHeight: 40,
        color: '#2D336B',
        fontSize: 26,
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

   

});