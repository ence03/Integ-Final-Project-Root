import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../../../assets/image/logo.png";
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";

const TeacherAddCourse = ({ route }) => {
  const [courseID, setCourseID] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCredits, setCourseCredits] = useState("");
  const [pressedItem, setPressedItem] = useState(null);
  const navigation = useNavigation();
  const { onEnroll } = route.params;

  const handleAddCourse = () => {
    if (courseID && courseDescription && courseCredits) {
      const newCourse = {
        CourseID: courseID,
        Description: courseDescription,
        Credits: parseInt(courseCredits, 10),
      };
      onEnroll([newCourse]);
      navigation.goBack();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePressIn = (item) => {
    setPressedItem(item);
  };

  const handlePressOut = () => {
    setPressedItem(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>Add Course</Text>
        <TextInput
          style={styles.input}
          placeholder="Course ID"
          value={courseID}
          onChangeText={setCourseID}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Description"
          value={courseDescription}
          onChangeText={setCourseDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Credits"
          keyboardType="numeric"
          value={courseCredits}
          onChangeText={setCourseCredits}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
          <Text style={styles.addButtonText}>Add Course</Text>
        </TouchableOpacity>
      </ScrollView>
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
    <Text style={pressedItem === 'Course Management' ? styles.menuTextPressed : styles.menuText}>Course & Student Management</Text>
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
};

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
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#024089",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
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

export default TeacherAddCourse;
