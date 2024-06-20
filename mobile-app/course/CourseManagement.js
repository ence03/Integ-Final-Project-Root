import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CourseManagement() {
  const [selectedCourses, setSelectedCourses] = useState(Array(7).fill(false));

  const toggleCheckbox = (index) => {
    const newSelectedCourses = [...selectedCourses];
    newSelectedCourses[index] = !newSelectedCourses[index];
    setSelectedCourses(newSelectedCourses);
  };

  const courses = [
    { CourseID: 'IT311', Description: 'Information Assurance and Security', Credits: 3 },
    { CourseID: 'IT312', Description: 'Networking 2', Credits: 3 },
    { CourseID: 'IT313', Description: 'Mobile Programming', Credits: 3 },
    { CourseID: 'IT314', Description: 'Software Engineering', Credits: 3 },
    { CourseID: 'IT315', Description: 'Database Systems', Credits: 3 },
    { CourseID: 'IT316', Description: 'Artificial Intelligence', Credits: 3 },
    { CourseID: 'IT317', Description: 'Web Development', Credits: 3 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>EnLite</Text>
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
        </ScrollView>
        <Text style={styles.totalUnitsText}>
          Total units: {selectedCourses.reduce((total, selected, index) => selected ? total + courses[index].Credits : total, 0)}
        </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 20,
  },
  menuButton: {
    position: 'absolute',
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 20,
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  totalUnitsText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'right',
  },
  dropButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  dropButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
});
