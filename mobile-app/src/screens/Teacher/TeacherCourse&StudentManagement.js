import React, { useState } from "react";
import {StyleSheet,Text,View,TouchableOpacity,ScrollView,Image,} from "react-native";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../../../assets/image/logo.png";


export default function TeacherCourseManagement() {
  const [selectedCourses, setSelectedCourses] = useState(Array(7).fill(false));

  const toggleCheckbox = (index) => {
    const newSelectedCourses = [...selectedCourses];
    newSelectedCourses[index] = !newSelectedCourses[index];
    setSelectedCourses(newSelectedCourses);
  };

  const courses = [
    {Description: "Information Assurance and Security"},
    {Description: "Networking 2"},
    { Description: "Mobile Programming"},
    {Description: "Software Engineering"},
    {Description: "Database Systems"},
    {Description: "Artificial Intelligence"},
    {Description: "Web Development"},
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
            <View key={index} style={styles.tableRow}>
              <Checkbox
                value={selectedCourses[index]}
                onValueChange={() => toggleCheckbox(index)}
                style={styles.checkbox}
              />
              <Text style={styles.tableCell}>{course.Description}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropButton}>
          <Text style={styles.dropButtonText}>Drop</Text>
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
    borderRadius: 3,
    alignItems: "center",
    marginTop: 5,
    
    width: 70,
    elevation: 5,
  },
  addButton: {
    backgroundColor: "#32DC43",
    paddingVertical: 10,
    borderRadius: 3,
    alignItems: "center",
    marginTop: "auto",
    width: 120,
    elevation: 5,
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    shadowOpacity: 100,
  },
  homeButton: {},
});
