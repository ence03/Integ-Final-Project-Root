import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../../assets/image/logo.png";
import { Checkbox } from 'expo-checkbox'; 
import Icon from "react-native-vector-icons/FontAwesome";

const EnrolledStudents = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const navigation = useNavigation();

    // Mock data for testing
    useEffect(() => {
        const mockData = [
            { id: '1', LastName: "Abragan", FirstName: "Jay", MiddleName: "Olats"},
            { id: '2', LastName: "Yamba", FirstName: "Rach", MiddleName: "Koi" },
            { id: '3', LastName: "Quismundo", FirstName: "Nest", MiddleName: "Bato" },
            { id: '4', LastName: "Justalero", FirstName: "Earl", MiddleName: "Omay" },
        ];
        setStudents(mockData);
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
    };

    const handleSelect = (student) => {
        setSelectedStudents((prev) => {
            if (prev.includes(student.id)) {
                return prev.filter(id => id !== student.id);
            } else {
                return [...prev, student.id];
            }
        });
    };

    const handleDelete = () => {
        const remainingStudents = students.filter(student => !selectedStudents.includes(student.id));
        setStudents(remainingStudents);
        setSelectedStudents([]);
    };

    return (
        <View style={styles.container}>
             <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>
            <Text style={styles.header}>Enrolled Students</Text>

            <TextInput
                style={styles.searchBar}
                placeholder="Search by ID or Name"
                value={search}
                onChangeText={handleSearch}
            />
            <ScrollView style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Last Name</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>First Name</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Middle Name</Text>
                </View>
                {students.filter(student =>
                    student.id.includes(search) ||
                    (student.LastName + ' ' + student.FirstName + ' ' + student.MiddleName).toLowerCase().includes(search.toLowerCase())
                ).map((student, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Checkbox
                            value={selectedStudents.includes(student.id)}
                            onValueChange={() => handleSelect(student)}
                            style={styles.checkbox}
                        />
                        <Text style={[styles.tableCell, styles.idColumn]}>{student.id}</Text>
                        <Text style={[styles.tableCell, styles.nameColumn]}>{student.LastName}</Text>
                        <Text style={[styles.tableCell, styles.nameColumn]}>{student.FirstName}</Text>
                        <Text style={[styles.tableCell, styles.nameColumn]}>{student.MiddleName}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.dropButton} onPress={handleDelete}>
                    <Text style={styles.dropButtonText}>Drop</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddStudent')}>
                     <Text style={styles.addButtonText}>Add Student</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={30} color="#000" />
        </TouchableOpacity>
      </View>

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',

    },
    logo: {
        width: 150, 
        height: 50, 
        resizeMode:"contain",
        alignItems: "right",
        marginBottom: 10,
       
      },
    menuButton: {
        position: "absolute",
        left: 10,
      },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
        
    },
    tableContainer: {
        marginBottom: 5,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    checkbox: {
        marginRight: 10,
    },
    // buttonContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     marginTop: 10,
    // },
    buttonContainer: {
        marginBottom: -30,
    },
    dropButton: {
        position:"absolute",
        backgroundColor: "#dc3545",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        width: 150,
    },
    addButton: {
        position:"absolute",
        backgroundColor: "#32DC43",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 50,
        width: 150,
    },
    dropButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    idColumn: {
        flex: 1,
    },
    nameColumn: {
        flex: 2,
    },
    footer: {
        marginTop: 140,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
      },
      footerButton: {
        flex: 1,
        alignItems: "center"
      },
});

export default EnrolledStudents;
