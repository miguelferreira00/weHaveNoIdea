import { useState } from 'react';
import { TextInput } from 'react-native-paper'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Pressable } from 'react-native';
import { Colors } from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export default function groupCreation() {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupNickname, setGroupNickname] = useState('');
    const [groupImage, setGroupImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGroupCreation = async () => {
        setIsLoading(true);
        try{
            const token = await AsyncStorage.getItem('authToken');
            const response = await fetch('https://rankly-9jlj.onrender.com/groups/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: groupName,
                    description: groupDescription,
                    groupNickname: groupNickname,
                }),
            });
            
            if(response.ok){
                const data = await response.json();
                console.log('Group created successfully:', data);
                router.push('/(tabs)/home');
            } else if(response.status === 401){
                await AsyncStorage.removeItem('authToken');
                router.push('/(auth)/login');
            } else {
                console.error('Erro na resposta:', response.status + ' ' + response.statusText);
            }
        } catch (error) {
            console.error("Error creating group:", error);
        } finally {
            setIsLoading(false);
        }


    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (!permissionResult.granted) {
          alert('Precisamos de permissão para aceder à galeria!');
          return;
        }
      
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
      
        if (!result.canceled) {
          setGroupImage(result.assets[0].uri);
        }
      };
      
    return(
        <View>
            <View className='header' style={styles.header}>
                {/* Design */}
                <Svg>
                    <Circle cx="-20%" cy="-20%" r="65%" fill="#AD5CC9"/>
                    <Circle cx="85%" cy="80%" r="55%" fill="#2D336B"/>
                    <Circle cx="85%" cy="80%" r="20%" fill="#7886C7"/>
                
                    <Circle cx="10%" cy="110%" r="50%" fill="#A9B5DF"/>
                </Svg>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Image
                    source={require('../assets/images/test/camera_icon.png')}
                    />
                </TouchableOpacity>

                {groupImage && (
                <Image source={{ uri: groupImage }} style={styles.previewImage} />
                )}


            </View>
            <View className='bottomSection'>

            </View>
            <TextInput
                className='groupNameBox'
                label={'Group Name'}
                value={groupName}
                onChangeText={(text) => {
                    setGroupName(text);
                }}
                mode='outlined'
                style={styles.textInput}
            />
            <TextInput
                className='descriptionBox'
                label={'Group Description'}
                value={groupDescription}
                onChangeText={(text) => {
                    setGroupDescription(text);
                }}
                mode='outlined'
                style={styles.textInput}
            />
            <TextInput
                className='groupNicknameBox'
                label={'Nickname'}
                value={groupNickname}
                onChangeText={(text) => {
                    setGroupNickname(text);
                }}
                mode='outlined'
                style={styles.textInput}
            />
            <Button
                title={isLoading ? "Creating..." : "Create Group"}
                iconName="login"
                onPress={handleGroupCreation}
                style={styles.button}
                />
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#7886C7',
        height: 325,
    },
    imagePicker: {
        backgroundColor: '#6A11CB',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: '50%',
        transform: [{ translateX: -50 }],
        marginTop: '-50%',
        width: 100,
        height: 100,
    },
      
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    button:{
        backgroundColor: '#6A11CB',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 80,
        width: 75,
    },
    textInput:{
        marginTop: 50,
        width: '80%',
        height: 60,
        backgroundColor: 'transparent',
        borderRadius: 30,
        color: 'black',
        borderColor: Colors.primary,
    }
});