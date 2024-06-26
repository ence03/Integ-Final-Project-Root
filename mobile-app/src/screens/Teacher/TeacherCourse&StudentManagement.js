import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../../../assets/image/logo.png";
import { useNavigation } from "@react-navigation/native";

export default function TeacherCourseManagement() {
  const [selectedCourses, setSelectedCourses] = useState(Array(7).fill(false));
  const [heldCourse, setHeldCourse] = useState(null);
  const navigation = useNavigation();

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
        <TouchableOpacity style={styles.menuButton}>
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

        <TouchableOpacity style={styles.dropButton}>
          <Text style={styles.dropButtonText}>Drop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("EnrolledStudents")}
        >
          <Text style={styles.addButtonText}>Add Course</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={30} color="#000" />
        </TouchableOpacity>
      </View>
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
  dropButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: "auto",
    width: 150,
  },
  addButton: {
    backgroundColor: "#32DC43",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: 150,
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
  footer: {
    marginTop: 140,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
  },
  heldCourseText: {
    fontWeight: "bold",
    color: "red",
  },
});
