import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { BorderRadius, GlobalStyles } from '../styles/globalStyles';
import { Button, Card } from '../components/ui';

export default function Index() {
  return (
      <View style={styles.container}>
        {/* Friends Group Image */}
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/test/groupIndex.png')}
            style={styles.backgroundImage} />
        </View>

        <View style={styles.overlayContainer}>
          <Image source={require('../assets/images/test/indexButtonsContainer.png')}
            style={styles.overlayImage}/>
          <Image source={require('../assets/images/test/logo.jpeg')}
            style={styles.logoImage}/>
        </View>
        

      </View>
      
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF2F2',
  },

  backgroundImage: {
    width: '430',
    height: '400',
    resizeMode: 'cover',

  },

  imageContainer: {
    position: 'absolute',  
    top: 110,
    left: -30,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },

  overlayContainer: {
    transform: [{ scale: 1.3 }], // Reduz o tamanho da imagem],
    zIndex: 1,
    position: 'relative',
    marginTop: 20,
    alignItems: 'center',
  },

  overlayImage: {
    resizeMode: 'contain',
  },

  logoImage:{
    position: 'absolute',
    top: 385,
    left: '50%',
    transform: [{ translateX: -35 }],
    width: 70,
    height: 70,
    borderRadius: BorderRadius.xlarge, 
    borderWidth: 2,
    borderColor: '#AD5CC9',
    overflow: 'hidden',
    resizeMode: 'cover', // importante: 'cover' para preencher e respeitar bordas
  }


}