import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/image/logo.png";
import Icon from "react-native-vector-icons/Ionicons";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    // navigation.navigate("Dashboard"); //for students na
    navigation.navigate("TeacherDashboard"); //for teacher na sya
  };

  const toggleHelpModal = () => {
    setIsHelpModalVisible(!isHelpModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={toggleHelpModal}>
        <Icon name="help-circle-outline" size={45} color="black" />
      </TouchableOpacity>
      <View>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Username" style={styles.input} />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.eye}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon name="eye-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.checkbox}>
      </View>

      <Modal
        visible={isHelpModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleHelpModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Help</Text>
            <Text style={styles.modalText}>
              If you have problems logging in, try again later or contact our
              developer or learning provider.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleHelpModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginRight: 20,
    marginBottom: 100,
    width: 300,
  },
  container: {
    flex: 1,
    maxWidth: "100%",
    height: "100%",
    padding: 5,
    justifyContent: "top",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 50,
  },
  icon: {
    marginLeft: "auto",
  },
  passwordContainer: {
    width: "100%",
  },
  eye: {
    position: "absolute",
    right: 0,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 10,
  },
  input: {
    borderColor: "black",
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#ffc619",
    padding: 5,
    width: "83%",
    marginBottom: 10,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,

  },
  closeButton: {
    backgroundColor: "#ffc619",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    elevation: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LoginScreen;
