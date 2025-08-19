import React from 'react';
import { useFonts } from 'expo-font';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';


export default function Index() {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/test/groupIndex.png')}
          style={styles.backgroundImage}
        />
        {/* Decorative elements */}
        <Image
          source={require('../../assets/images/test/relevoCima.png')}
          style={styles.backgroundRelevanceright}
        />
        <Image
          source={require('../../assets/images/test/relevoCima.png')}
          style={styles.backgroundRelevanceleft}
        />
      </View>

      {/* Overlay Content */}
      <View style={styles.overlayContainer}>
        {/* Container with background image and content */}
        <View style={styles.contentContainer}>
          {/* Background image for the container */}
          <Image
            source={require('../../assets/images/test/indexButtonsContainer.png')}
            style={styles.containerBackground}
            resizeMode="contain"
          />
          
          {/* App Name */}
          <Text style={styles.appName}>RANKLY</Text>
          
          {/* Buttons */}
          <View style={styles.buttonsWrapper}>
            <Pressable style={styles.button} onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
            
            <Pressable style={[styles.button, styles.secondButton]} onPress={() => router.push('/(auth)/sign_up')}>
              <Text style={styles.secondButtonText}>SIGN UP</Text>
            </Pressable>
          </View>
        </View>
        
        {/* Logo */}
        <Image
          source={require('../../assets/images/test/logo.jpeg')}
          style={styles.logoImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2F2',
  },
  imageContainer: {
    position: 'absolute',
    top: 110,
    left: -30,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  backgroundImage: {
    width: 430,
    height: 400,
    resizeMode: 'cover',
  },
  backgroundRelevanceright: {
    position: 'absolute',
    top: -180,
    left: -160,
    width: '100%',
    height: 200,
    transform: [{ scale: 5 }, { rotate: '180deg' }],
    resizeMode: 'contain',
  },
  backgroundRelevanceleft: {
    position: 'absolute',
    top: -180,
    left: 200,
    width: '100%',
    height: 200,
    transform: [{ scale: 5 }],
    resizeMode: 'contain',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 50,
  },
  contentContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  containerBackground: {
    position: 'absolute',
    marginTop: -50,
    width: '100%',
    height: '100%',
    transform: [{ scale: 8.5 }],
  },
  appName: {
    fontFamily: 'PressStart2P',
    color: 'white',
    fontSize: 45,
    textAlign: 'center',
    marginTop: -20, // Ajuste para posicionar o texto
    marginBottom: 40,
  },
  buttonsWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#AD5CC9',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    borderColor: 'yellow',
    width: 160,
    height: 65,
    marginBottom: 20,
  },
  secondButton: {
    marginBottom: 0,
    backgroundColor: '#FFf',
    borderColor: '#AD5CC9',
    borderWidth: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },

  secondButtonText: {
    color: '#AD5CC9',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#AD5CC9',
    marginTop: -400,
  },
});