import React from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Button } from '../../components/ui/Button';
import { router } from 'expo-router';

export default function signUp() {
    return(
        <Pressable style={styles.backButton} onPress={() => router.back()}>

        </Pressable>
            
    )
}

const styles = StyleSheet.create({
    backButton: {
        color: 'black',
    }

});