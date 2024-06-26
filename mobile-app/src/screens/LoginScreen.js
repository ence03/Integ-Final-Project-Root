import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/image/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "react-native-axios";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    navigation.navigate("TeacherDashboard");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <Icon name="help-circle-outline" size={45} color="black" />
      </TouchableOpacity>
      <View>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
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
    borderWidth: 0.2,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 20,
  },
  icon: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 10,
  },
});

export default LoginScreen;
