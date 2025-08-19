import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for your group data
interface Group {
    id: number;
    name: string;
    description: string;
}

export default function Home() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);

    const getGroups = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('authToken');

            if (!token) {
                console.log('Token não encontrado');
                router.push('/login');
                return;
            }

            const response = await fetch('https://rankly-9jlj.onrender.com/groups/getUserGroups', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const groupsData = await response.json();
                setGroups(groupsData);
            } else if (response.status === 401) {
                await AsyncStorage.removeItem('authToken');
                router.push('/login');
            } else {
                console.error('Erro na resposta:', response.status + ' ' + response.statusText);
            }

        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getGroups();
    }, []);

    const renderGroupItem = ({ item }: { item: Group }) => (
        <TouchableOpacity style={styles.groupItem}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando grupos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pronto para jogar?</Text>
            {/* Divisor */}
                <View style={styles.divisor} />

            {groups.length > 0 ? (
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderGroupItem}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text style={styles.emptyText}>Nenhum grupo encontrado</Text>
            )}
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => router.push('../groupCreation')}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        marginTop: 50,
        fontFamily: 'PressStart2P',
        color: '#AD5CC9'
    },
    divisor:{
        width: 170,
        height: 3,
        backgroundColor: '#AD5CC9',
        borderRadius: 10,
        marginTop: 25,
        alignSelf: 'center',
    },
    groupItem: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    groupName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    groupDescription: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginTop: 50,
    },
    addButton:{
        backgroundColor: '#2D336B',
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 40,
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
    },
});