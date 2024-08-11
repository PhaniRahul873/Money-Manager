import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const userId = generateUserId(); // Generate a numeric user ID
    const createDate = generateCreateDate(); // Generate current date in string format

    const newUser = {
      email,
      passwordHash: password, // Assuming this field name is consistent with your backend
      userName,
      userId,
      createDate,
      currentBalance: 0,
    };

    try {
      console.log('Creating user:', newUser); // Debug log
      const createdUser = await createUser(newUser);
      console.log('User created:', createdUser); // Debug log
      Alert.alert('Success', 'Account created successfully');
      props.navigation.navigate('Login');
    } catch (error) {
      console.error('Signup error:', error); // Debug log
      Alert.alert('Error', `Error: ${error.message}`);
    }
  };

  const generateUserId = () => Math.floor(Math.random() * 100); // Generate a numeric user ID

  const generateCreateDate = () => new Date().toISOString(); // Generate current date in ISO string format

  const createUser = async (newUser) => {
    try {
      const response = await fetch('http://192.168.29.230:3000/api/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.headerText}>Register</Text>
        <Text style={styles.subHeaderText}>Create a new account</Text>
        <View style={styles.formContainer}>
          <Field
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Field
            placeholder="User Name"
            value={userName}
            onChangeText={setUserName}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Field
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>By signing in, you agree to our{' '}</Text>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </View>
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>and </Text>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={handleSignup}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?{' '}</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 400,
  },
  headerText: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: 150,
  },
  subHeaderText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    height: 700,
    width: 460,
    borderTopLeftRadius: 130,
    paddingTop: 50,
    alignItems: 'center',
  },
  termsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '78%',
    paddingRight: 16,
    justifyContent: 'center',
  },
  termsText: {
    color: 'grey',
    fontSize: 12,
  },
  linkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Signup;
