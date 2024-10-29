import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link, NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation-stack';
interface LoginScreenState {
  email: string;
  password: string;
}
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/token/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      // Handle successful login
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately
      setLoading(false);
    }
  };

// const LoginScreen = ({ navigation }: { navigation: any }) => {
//   const [state, setState] = useState<LoginScreenState>({
//     email: "",
//     password: "",
//   });
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//    async function handleLogin(){
//     // Simulating API call
    
//       const response = await fetch(`http://127.0.0.1:8000/token`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(state)
//       });

//       // if (
//       //   state.email === "test@example.com" &&
//       //   state.password === "password123"
//       // ) {
//       //   navigation.navigate("Home");
//       // } else {
//       //   alert("Invalid credentials");
//       // }
    
//   };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link}>
        Don't have an account? <Link to={"/SignupScreen"}>Register here</Link>
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