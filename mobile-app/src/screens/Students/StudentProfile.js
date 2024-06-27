import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/image/logo.png";
import Modal from 'react-native-modal';

export default function StudentProfile() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
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

  const toggleSettingsModal = () => {
    setSettingsModalVisible(!isSettingsModalVisible);
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.profileContainer}>
        <Icon name="user-circle" size={100} color="#000" />
        <Text style={styles.nameText}>CHRISTIAN JAY ABRAGAN</Text>
        <Text style={styles.roleText}>BSIT 3R2</Text>
        <Text style={styles.idText}>2021301831</Text>
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contacts</Text>
        <Text style={styles.contactText}>Email address</Text>
        <Text style={styles.contactValue}>Abragan.Christianjay@gmail.com</Text>
        <Text style={styles.contactText}>City/town</Text>
        <Text style={styles.contactValue}>Cagayan De Oro</Text>
        <Text style={styles.contactText}>Country</Text>
        <Text style={styles.contactValue}>Cagayan De Oro</Text>
      </View>

      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsButton} onPress={toggleSettingsModal}>
        <Icon name="cog" size={30} color="#000" />
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal isVisible={isSettingsModalVisible} onBackdropPress={toggleSettingsModal} style={styles.modalsettings}>
        <View style={styles.modalSettingsContent}>
          <Text style={styles.settingsText}>Settings</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleSettingsModal();
              navigation.navigate("StudentChangepass");
            }}
          >
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
              pressedItem === 'Grades' && styles.menuItemPressed,
            ]}
            onPressIn={() => handlePressIn('Grades')}
            onPressOut={handlePressOut}
            onPress={() => {
              toggleModal();
              navigation.navigate("SGrade");
            }}
          >
            <Text style={pressedItem === 'Grades' ? styles.menuTextPressed : styles.menuText}>Grades</Text>
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
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  roleText: {
    fontSize: 18,
    color: "#888",
  },
  idText: {
    fontSize: 16,
    color: "#888",
  },
  contactContainer: {
    marginHorizontal: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  contactText: {
    fontSize: 16,
    marginTop: 10,
  },
  contactValue: {
    fontSize: 16,
    color: "#555",
  },
  settingsButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalsettings: {
    justifyContent: 'center',
    margin: 0,
  },
  modalSettingsContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  settingsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
    fontWeight: "500",
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
    marginTop: 300,
    borderWidth: 1, 
  },
  logoutText: {
    color: "#fff",
    marginLeft: 10,
  },
});
