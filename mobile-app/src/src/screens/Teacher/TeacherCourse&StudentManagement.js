import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Pressable} from "react-native";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../../../assets/image/logo.png";
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';


export default function TeacherCourseManagement() {
  const [selectedCourses, setSelectedCourses] = useState(Array(7).fill(false));
  const [heldCourse, setHeldCourse] = useState(null);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [pressedItem, setPressedItem] = useState(null);

  const toggleCheckbox = (index) => {
    const newSelectedCourses = [...selectedCourses];
    newSelectedCourses[index] = !newSelectedCourses[index];
    setSelectedCourses(newSelectedCourses);
  };

  const handleCoursePressIn = (index) => {
    setHeldCourse(index);
  };

  const handleCoursePressOut = (index) => {
    setHeldCourse(null);
    navigation.navigate("EnrolledStudents");
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

  const courses = [
    { CourseID: "IT311", Description: "Information Assurance and Security", Credits: 3 },
    { CourseID: "IT312", Description: "Networking 2", Credits: 3 },
    { CourseID: "IT313", Description: "Mobile Programming", Credits: 3 },
    { CourseID: "IT314", Description: "Software Engineering", Credits: 3 },
    { CourseID: "IT315", Description: "Database Systems", Credits: 3 },
    { CourseID: "IT316", Description: "Artificial Intelligence", Credits: 3 },
    { CourseID: "IT317", Description: "Web Development", Credits: 3 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <Text style={styles.headerText}>Course management</Text>
        <ScrollView style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Course Name</Text>
          </View>
          {courses.map((course, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tableRow}
              onPressIn={() => handleCoursePressIn(index)}
              onPressOut={() => handleCoursePressOut(index)}
            >
              <Checkbox
                value={selectedCourses[index]}
                onValueChange={() => toggleCheckbox(index)}
                style={styles.checkbox}
              />
              <Text
                style={[
                  styles.tableCell,
                  heldCourse === index && styles.heldCourseText,
                ]}
              >
                {course.Description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.dropButton}>
          <Text style={styles.dropButtonText}>Drop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Course</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontSize: 24,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    textAlign: "left",
  },
  checkbox: {
    marginRight: 10,
  },
  totalUnitsText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "right",
  },
  buttonContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 150,
  },
  dropButton: {
    backgroundColor: "#fa841a",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: "auto",
    elevation: 5,
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: "#024089",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
    borderWidth: 1,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
