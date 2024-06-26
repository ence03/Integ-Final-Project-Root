import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'expo-checkbox'; // Import Checkbox from expo-checkbox

const AddStudent = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const navigation = useNavigation();

    // Mock data for testing
    useEffect(() => {
        const mockData = [
            { id: '5', name: 'Charlie Green' },
            { id: '6', name: 'Diana White' },
            { id: '7', name: 'Eve Black' },
            { id: '8', name: 'Frank Blue' },
        ];
        setStudents(mockData);
    }, []);

    const handleSelect = (student) => {
        setSelectedStudents((prev) => {
            if (prev.includes(student.id)) {
                return prev.filter(id => id !== student.id);
            } else {
                return [...prev, student.id];
            }
        });
    };

    const handleAdd = () => {
        // For demonstration purposes, this adds selected students to the enrolled list
        console.log('Selected students to add:', selectedStudents);
        navigation.navigate('EnrolledStudents');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Students</Text>
            <FlatList
                data={students}
                renderItem={({ item }) => (
                    <View style={styles.studentItem}>
                        <Checkbox // Using Expo's Checkbox component
                            value={selectedStudents.includes(item.id)}
                            onValueChange={() => handleSelect(item)}
                        />
                        <Text>{item.name}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <Button title="Add Student" onPress={handleAdd} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});

export default AddStudent;