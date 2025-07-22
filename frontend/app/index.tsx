import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { GlobalStyles } from '../styles/globalStyles';
import { Button, Card } from '../components/ui';

export default function Index() {
  return (
      <View style={styles.container}>
        {/* Friends Group Image */}
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/test/groupIndex.png')}
            style={styles.backgroundImage} />
        </View>

        <View>
          <Image source={require('../assets/images/test/indexButtonsContainer.png')}/>
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
    width: '100%',
    height: '300',
    resizeMode: 'cover',

  },

  imageContainer: {
    position: 'absolute',  // Garante controle total da posição
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
}