import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/image/logo.png";
import Modal from 'react-native-modal';


export default function CourseManagement() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [pressedItem, setPressedItem] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState(Array(7).fill(false));

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePressIn = (item) => {
    setPressedItem(item);
  };

  const handlePressOut = () => {
    setPressedItem(null);
  };

  const toggleCheckbox = (index) => {
    const newSelectedCourses = [...selectedCourses];
    newSelectedCourses[index] = !newSelectedCourses[index];
    setSelectedCourses(newSelectedCourses);
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
        <Text style={styles.subHeaderText}>(Dropping)</Text>
        <ScrollView style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Course Code</Text>
            <Text style={styles.tableHeaderText}>Description</Text>
            <Text style={styles.tableHeaderText}>Units</Text>
          </View>
          {courses.map((course, index) => (
            <View key={index} style={styles.tableRow}>
              <Checkbox
                value={selectedCourses[index]}
                onValueChange={() => toggleCheckbox(index)}
                style={styles.checkbox}
              />
              <Text style={styles.tableCell}>{course.CourseID}</Text>
              <Text style={styles.tableCell}>{course.Description}</Text>
              <Text style={styles.tableCell}>{course.Credits}</Text>
            </View>
          ))}
          <Text style={styles.totalUnitsText}>
            Total units: {selectedCourses.reduce((total, selected, index) => selected ? total + courses[index].Credits : total, 0)}
          </Text>
        </ScrollView>
        <TouchableOpacity style={styles.dropButton}>
          <Text style={styles.dropButtonText}>Drop</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="arrow-left" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Icon name="user-circle" size={50} color="#000" />
            <Text style={styles.modalName}>CHRISTIAN JAY ABRAGAN</Text>
          </View>
          {['Course Management', 'Grades', 'Notification', 'Settings'].map(item => (
            <Pressable
              key={item}
              style={({ pressed }) => [
                styles.menuItem,
                pressedItem === item && styles.menuItemPressed,
              ]}
              onPressIn={() => handlePressIn(item)}
              onPressOut={handlePressOut}
              onPress={() => {
                toggleModal();
                navigation.navigate(item.replace(' ', ''));
              }}
            >
              <Text
                style={pressedItem === item ? styles.menuTextPressed : styles.menuText}
              >
                {item}
              </Text>
            </Pressable>
          ))}
          <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
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
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 20,
  },
  tableContainer: {
    flex: 1,
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
    textAlign: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  totalUnitsText: {
    fontSize: 16,
    marginTop: 10,
    marginRight: 20,
    textAlign: "right",
  },
  dropButton: {
    backgroundColor: "#024089",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  dropButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  footerButton: {
    alignItems: "center",
    paddingHorizontal: 10,
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
    marginTop: 300,
  },
  logoutText: {
    color: "#fff",
    marginLeft: 10,
  }
});
