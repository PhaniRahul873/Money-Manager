import React, { useState,useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import UserContext from '../util/User'
import Background from '../components/Background'
import SignUpButton from '../components/SignUpButton'
import Field from '../components/Field'
import { createUser } from '../util/Api'

const Signup = (props) => {
  const { navigation } = props
  const {setUser} = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userName, setUserName] = useState('')

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }
    const userId = generateUserId()
    const createDate = generateCreateDate()

    const newUser = {
      email,
      passwordHash: password,
      userName,
      userId,
      createDate,
      currentBalance: 0
    }

    try {
      console.log('Creating user:', newUser)
      const user = await createUser(newUser)
      console.log('User created:', user)
      setUser(userId)
      Alert.alert('Success', 'Account created successfully')
      navigation.navigate('Tabs')
    } catch (error) {
      console.error('Signup error:', error)
      Alert.alert('Error', `Error: ${error.message}`)
    }
  }

  const generateUserId = () => Math.floor(Math.random() * 100)
  const generateCreateDate = () => new Date().toISOString()

  return (
    <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
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
            <SignUpButton btnLabel="Signup" Press={handleSignup} />
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Background>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginTop: -100
  },
  headerText: {
    color: 'black',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subHeaderText: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30
  },
  linkText: {
    color: '#006A42',
    fontWeight: 'bold',
    fontSize: 20
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignItems:'center'
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black'
  }
})

export default Signup