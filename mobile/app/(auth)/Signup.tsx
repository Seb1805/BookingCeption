import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { router } from 'expo-router';
import userApi from '@/api/axios/routes/users';
import { User } from '@/constants/DBDatatypes';
// import { createStackNavigator } from '@react-navigation-stack';

interface SignUpScreenState {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  role: number
}

const SignUpScreen = () => {
  const [state, setState] = useState<User>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    address: '',
    role: 1
  });

  async function handleSignUp() {
    if(validateFormValues(state)) {
      try {
        const response = await userApi.addUser(state)
        
        if (response.status == 200) {
          router.replace('/(auth)/Login');
        }
        else{
          throw new Error("Du er skrald jo")
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  function validateFormValues(state: SignUpScreenState): boolean {
    return (
      state.email.length > 0 &&
      state.password.length > 0 &&
      state.firstname.length > 0 &&
      state.lastname.length > 0 &&
      state.address.length > 0 &&
      state.role > 0
    );
  }
  // const handleLogin = () => {
  //   // Simulating API call
  //   setTimeout(() => {
  //     if (state.email === 'test@example.com' && state.password === 'password123') {
  //       navigation.navigate('Home');
  //     } else {
  //       alert('Invalid credentials');
  //     }
  //   }, 2000);
  // };

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
      <TextInput
        style={styles.input}
        placeholder="firstname"
        value={state.firstname}
        onChangeText={(text) => setState({ ...state, firstname: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="lastname"
        value={state.lastname}
        onChangeText={(text) => setState({ ...state, lastname: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="address"
        value={state.address}
        onChangeText={(text) => setState({ ...state, address: text })}
      />

      <Button title="Sign up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
