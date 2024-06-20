import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>EnLite</Text>
      </View>
      <Text style={styles.dashboardText}>Dashboard</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, styles.profileCard]}>
          <Icon name="user" size={40} color="#fff" />
          <Text style={styles.cardText}>PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.notificationCard]}>
          <Icon name="bell" size={40} color="#fff" />
          <Text style={styles.cardText}>NOTIFICATION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.gradesCard]}>
          <Icon name="graduation-cap" size={40} color="#fff" />
          <Text style={styles.cardText}>GRADES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.courseCard]}
          onPress={() => navigation.navigate('CourseManagement')}
        >
          <Icon name="book" size={40} color="#fff" />
          <Text style={styles.cardText}>COURSE MANAGEMENT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.homeButton}>
          <Icon name="home" size={40} color="#000" />
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 20,
  },
  menuButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dashboardText: {
    fontSize: 18,
    margin: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '40%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileCard: {
    backgroundColor: '#007bff',
  },
  notificationCard: {
    backgroundColor: '#6f42c1',
  },
  gradesCard: {
    backgroundColor: '#dc3545',
  },
  courseCard: {
    backgroundColor: '#dc3545',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  homeButton: {
  },
});
