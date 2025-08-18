import { useState } from 'react';
import { TextInput } from 'react-native-paper'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Pressable } from 'react-native';
import { Colors } from '../../styles/globalStyles';
import { Button } from '../../components/ui/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function groupCreation() {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupNickname, setGroupNickname] = useState('');
    const [groupImage, setGroupImage] = useState(null);
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


        
        // Aqui você pode implementar a lógica para criar um grupo
        // Por exemplo, enviar uma requisição para o backend
    };
    return(
        <View>
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