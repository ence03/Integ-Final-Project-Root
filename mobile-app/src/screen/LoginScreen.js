import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Logo from "../../assets/image/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "expo-checkbox";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Dashboard");
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
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? "#74aef5" : undefined}
        />
        <Text>Remember me</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
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
    backgroundColor: "#74aef5",
    padding: 5,
    width: "83%",
    marginBottom: 10,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
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
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
  },
});

export default LoginScreen;
