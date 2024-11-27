import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link, NavigationContainer } from "@react-navigation/native";
// import { login } from loginApi
import {loginApi } from "@/api/axios/axiosClient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message"

// import { createStackNavigator } from '@react-navigation-stack';
interface LoginScreenState {
  email: string;
  password: string;
}
const LoginScreen = () => {
  const baseUrl = `${process.env.EXPO_PUBLIC_SCHEMA_SERVER}${process.env.EXPO_PUBLIC_SERVER_DOMAIN}`

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {

      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await fetch(`${baseUrl}/token/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.status === 200) {
        await AsyncStorage.setItem("access_token", data.access_token);
      }
      
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      setLoading(false);
      router.replace('/(tabs)/Account');
    }
    catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Forkert email eller password',
        position: 'top'
      })
      console.error("Error:", error);
  };
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link}>
        Don't have an account? <Link to={"/Signup"}>Register here</Link>
      </Text>
    <Toast /> 
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