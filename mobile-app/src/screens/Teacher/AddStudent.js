import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Pressable} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Logo from "../../../assets/image/logo.png";
import { Checkbox } from 'expo-checkbox';
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from 'react-native-modal';


const AddStudents = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const { onEnroll } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [pressedItem, setPressedItem] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePressIn = (item) => {
    setPressedItem(item);
  };

  const handlePressOut = () => {
    setPressedItem(null);
  };

    useEffect(() => {
        const mockData = [
            { id: '5', LastName: "Doe", FirstName: "John", MiddleName: "A" },
            { id: '6', LastName: "Smith", FirstName: "Anna", MiddleName: "B" },
            { id: '7', LastName: "Taylor", FirstName: "James", MiddleName: "C" },
            { id: '8', LastName: "Brown", FirstName: "Lisa", MiddleName: "D" },
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

    const handleEnroll = () => {
        const newStudents = students.filter(student => selectedStudents.includes(student.id));
        onEnroll(newStudents);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
                    <Icon name="bars" size={30} color="#000" />
                </TouchableOpacity>
                <Image source={Logo} style={styles.logo} />
            </View>
            <Text style={styles.dashboardText}>Add Students</Text>
            <ScrollView style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.idColumn]}>ID</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Last Name</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>First Name</Text>
                    <Text style={[styles.tableHeaderText, styles.nameColumn]}>Middle Name</Text>
                </View>
                {students.map((student, index) => (
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
                <TouchableOpacity style={styles.enrollButton} onPress={handleEnroll}>
                    <Text style={styles.enrollButtonText}>Enroll</Text>
                </TouchableOpacity>
            </View>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}style={styles.modal}>

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
      navigation.navigate("CourseManagement");
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
      navigation.navigate("StudentNotification");
    }}
  >
    <Text style={pressedItem === 'Notification' ? styles.menuTextPressed : styles.menuText}>Notification</Text>
  </Pressable>
  <Pressable
    style={({ pressed }) => [
      styles.menuItem,
      pressedItem === 'Settings' && styles.menuItemPressed,
    ]}
    onPressIn={() => handlePressIn('Settings')}
    onPressOut={handlePressOut}
    onPress={() => {
      toggleModal();
      navigation.navigate("Settings");
    }}
  >
    <Text style={pressedItem === 'Settings' ? styles.menuTextPressed : styles.menuText}>Settings</Text>
  </Pressable>
  <TouchableOpacity style={styles.logoutButton} onPress={() => {
    toggleModal(); navigation.navigate("LoginScreen")
  }}>
    <Icon name="sign-out" size={20} color="#fff" />
    <Text style={styles.logoutText}>LOG OUT</Text>
  </TouchableOpacity>
</View>
</Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 200,
        marginLeft: 10,
        marginRight: 10,
    },
    enrollButton: {
        backgroundColor: "#024089",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        width: '100%',
        borderWidth: 1,
        elevation: 5, 
    },
    enrollButtonText: {
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
    //menu ni sya
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
});

export default AddStudents;
