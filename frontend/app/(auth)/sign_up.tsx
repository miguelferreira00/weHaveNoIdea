import React from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Button } from '../../components/ui/Button';
import { router } from 'expo-router';

export default function signUp() {
    return(
        <Button 
            onPress={function (): void {
            router.back();
            }}
            iconName='arrowleft'
            style={styles.backButton}
            useGradient={false}
        />
            
    )
}

const styles = StyleSheet.create({
    backButton: {

    }

});