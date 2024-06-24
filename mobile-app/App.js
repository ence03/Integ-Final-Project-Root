import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./src/screens/Students/StudentDashboard";
import CourseManagement from "./src/screens/Students/StudentCourseManagement";
import LoginScreen from "./src/screens/LoginScreen";
import TeacherDashboard from "./src/screens/Teacher/TeacherDashboard";
import TeacherCourseManagement from "./src/screens/Teacher/TeacherCourse&StudentManagement";
import StudentGrade from "./src/screens/Students/StudentGrade";
import StudentNotification from "./src/screens/Students/StudentNotification";



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentGrade"
          component={StudentGrade}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentNotification"
          component={StudentNotification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeacherDashboard"
          component={TeacherDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CourseManagement"
          component={CourseManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeacherCourseManagement"
          component={TeacherCourseManagement}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
