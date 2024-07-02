import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/image/logo.png";
import Modal from 'react-native-modal';


export default function TeacherDashboard() {
  const navigation = useNavigation();
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>
      <Text style={styles.dashboardText}>Dashboard</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, styles.profileCard]}
        onPress={() => navigation.navigate("TeacherProfile")}>
          <Icon name="user" size={52} color="#fff" />
          <Text style={styles.cardText}>PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.notificationCard]}
        onPress={() => navigation.navigate("TeacherNotification")}>
          <Icon name="bell" size={50} color="#fff" />
          <Text style={styles.cardText}>NOTIFICATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.courseCard]}
          onPress={() => navigation.navigate("TeacherCourseManagement")}>
          <Icon name="book" size={40} color="#fff"  />
          <Text style={styles.cardText}>COURSE & STUDENT MANAGEMENT</Text>
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
  dashboardText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "500",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    borderRadius: 10,
    width: "40%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    elevation: 10, 
    borderWidth: 1, 
    borderColor: "#000", 
  },
  profileCard: {
    height: 192,
    width: 141,
    backgroundColor: "#fda300",
    marginLeft: 20,
  },
  notificationCard: {
    height: 192,
    width: 141,
    backgroundColor: "#fa841a",
    marginRight: 20,
  },
  courseCard: {
    width: 296,
    backgroundColor: "#8acae6",
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: "center",
    marginTop: 10,
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
