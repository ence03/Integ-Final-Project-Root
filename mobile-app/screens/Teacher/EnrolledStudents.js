import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../../assets/image/logo.png";
import { Checkbox } from 'expo-checkbox';
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from 'react-native-modal';

const EnrolledStudents = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [pressedItem, setPressedItem] = useState(null);
    const [gradingModalVisible, setGradingModalVisible] = useState(false);
    const [gradeSelectionVisible, setGradeSelectionVisible] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [midtermGrade, setMidtermGrade] = useState('');
    const [finalGrade, setFinalGrade] = useState('');
    const [gpa, setGpa] = useState('');
    const [gradeType, setGradeType] = useState('');

    const grades = ['1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00', '4.00', '5.00'];

    useEffect(() => {
        const mockData = [
            { id: '1', LastName: "Abragan", FirstName: "Jay", MiddleName: "Olats" },
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

    const handleEnroll = (newStudents) => {
        setStudents((prevStudents) => [...prevStudents, ...newStudents]);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handlePressIn = (item) => {
        setPressedItem(item);
    };

    const handlePressOut = () => {
        setPressedItem(null);
    };

    const toggleGradingModal = (student) => {
        setCurrentStudent(student);
        setMidtermGrade('');
        setFinalGrade('');
        setGpa('');
        setGradingModalVisible(!gradingModalVisible);
    };

    const handleGradeChange = (grade, type) => {
        if (type === 'midterm') {
            setMidtermGrade(grade);
        } else if (type === 'final') {
            setFinalGrade(grade);
            setGpa(((parseFloat(midtermGrade) + parseFloat(grade)) / 2).toFixed(2));
        }
    };

    const handleUpdate = () => {
        setGradingModalVisible(false);
    };

    const handleReset = () => {
        setMidtermGrade('');
        setFinalGrade('');
        setGpa('');
    };

    const openGradeSelection = (type) => {
        setGradeType(type);
        setGradeSelectionVisible(true);
    };

    const selectGrade = (grade) => {
        handleGradeChange(grade, gradeType);
        setGradeSelectionVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
                    <Icon name="bars" size={30} color="#000" />
                </TouchableOpacity>
                <Image source={Logo} style={styles.logo} />
            </View>
            <Text style={styles.dashboardText}>Enrolled Students</Text>
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
                    <TouchableOpacity key={index} style={styles.tableRow} onPress={() => toggleGradingModal(student)}>
                        <Checkbox
                            value={selectedStudents.includes(student.id)}
                            onValueChange={() => handleSelect(student)}
                            style={styles.checkbox}
                        />
                        <Text style={[styles.tableCell, styles.idColumn]}>{student.id}</Text>
                        <Text style={[styles.tableCell, styles.nameColumn]}>{student.LastName}</Text>
                        <Text style={[styles.tableCell, styles.nameColumn]}>{student.FirstName}</Text>
                        <Text style={[styles.tableCell, styles.nameColumn]}>{student.MiddleName}</Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.dropButton} onPress={handleDelete}>
                        <Text style={styles.dropButtonText}>Drop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddStudents', { onEnroll: handleEnroll })}>
                        <Text style={styles.addButtonText}>Add Student</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Icon name="user-circle" size={50} color="#000" />
                        <Text style={styles.modalName}>CHRISTIAN JAY ABRAGAN</Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.menuItem,
                            pressedItem === 'Course Management' && styles.menuItemPressed,
                        ]}
                        onPressIn={() => handlePressIn('Course Management')}
                        onPressOut={handlePressOut}
                        onPress={() => {
                            toggleModal();
                            navigation.navigate("TeacherCourseManagement");
                        }}
                    >
                        <Text style={pressedItem === 'Course Management' ? styles.menuTextPressed : styles.menuText}>Course Management</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.menuItem,
                            pressedItem === 'Notification' && styles.menuItemPressed,
                        ]}
                        onPressIn={() => handlePressIn('Notification')}
                        onPressOut={handlePressOut}
                        onPress={() => {
                            toggleModal();
                            navigation.navigate("TeacherNotification");
                        }}
                    >
                        <Text style={pressedItem === 'Notification' ? styles.menuTextPressed : styles.menuText}>Notification</Text>
                    </Pressable>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => {
                        toggleModal(); navigation.navigate("LoginScreen")
                    }}>
                        <Icon name="sign-out" size={20} color="#fff" />
                        <Text style={styles.logoutText}>LOG OUT</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={gradingModalVisible} onBackdropPress={() => setGradingModalVisible(false)}>
                <View style={styles.gradingModalContent}>
                    <Text style={styles.gradingModalTitle}>Grading</Text>
                    <Text style={styles.gradingModalLabel}>Midterm:</Text>
                    <TouchableOpacity style={styles.dropdown} onPress={() => openGradeSelection('midterm')}>
                        <Text style={styles.dropdownText}>{midtermGrade || 'Select Grade'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.gradingModalLabel}>Final:</Text>
                    <TouchableOpacity style={styles.dropdown} onPress={() => openGradeSelection('final')}>
                        <Text style={styles.dropdownText}>{finalGrade || 'Select Grade'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.gradingModalLabel}>GPA: {gpa}</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleUpdate}>
                            <Text style={styles.modalButtonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleReset}>
                            <Text style={styles.modalButtonText}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={gradeSelectionVisible} onBackdropPress={() => setGradeSelectionVisible(false)}>
                <View style={styles.gradingModalContent}>
                    <Text style={styles.gradingModalTitle}>Select Grade</Text>
                    {grades.map((grade) => (
                        <TouchableOpacity key={grade} style={styles.menuItem} onPress={() => selectGrade(grade)}>
                            <Text style={styles.menuText}>{grade}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginTop: 20,
    },
    logo: {
        width: 150,
        height: 50,
        resizeMode: "contain",
        alignItems: "center",
    },
    menuButton: {
        position: "absolute",
        left: 10,
    },
    dashboardText: {
        fontSize: 18,
        margin: 10,
        fontWeight: "500",
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    tableContainer: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
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
    buttonContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    dropButton: {
        backgroundColor: "#fa841a",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        elevation: 5,
        borderWidth: 1,
        marginTop: 70,
    },
    addButton: {
        backgroundColor: "#024089",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        elevation: 5,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
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
    modal: {
        justifyContent: 'flex-start',
        margin: 0,
        marginRight: 50,
        marginTop: 45,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalName: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuItemPressed: {
        backgroundColor: '#f0f0f0',
    },
    menuText: {
        fontSize: 18,
        fontWeight: "500",
    },
    menuTextPressed: {
        fontSize: 18,
        fontWeight: "500",
        color: "#8ecae6",
    },
    logoutButton: {
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fa841a",
        padding: 10,
        borderRadius: 5,
        marginTop: 355,
        borderWidth: 1,
    },
    logoutText: {
        color: "#fff",
        marginLeft: 10,
    },
    gradingModalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    gradingModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    gradingModalLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 16,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#024089',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EnrolledStudents;
