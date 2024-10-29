import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link, NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation-stack';
interface LoginScreenState {
  email: string;
  password: string;
}
const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [state, setState] = useState<LoginScreenState>({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    // Simulating API call
    setTimeout(() => {
      if (
        state.email === "test@example.com" &&
        state.password === "password123"
      ) {
        navigation.navigate("Home");
      } else {
        alert("Invalid credentials");
      }
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChangeText={(text) => setState({ ...state, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={state.password}
        onChangeText={(text) => setState({ ...state, password: text })}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link}>
        Don't have an account? <Link to={"/Signup"}>Register here</Link>
      </Text>
      {/* <Text style={styles.link} onPress={() => navigation.navigate('SignUpScreen')}>
        Don't have an account? Register here
      </Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    // color: "#007AFF",
    // textDecorationLine: "underline",
  },
});
export default LoginScreen;