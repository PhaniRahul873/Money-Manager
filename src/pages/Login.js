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
import { SimpleLineIcons } from '@expo/vector-icons'
import Background from '../components/Background'
import Field from '../components/Field'
import SignUpButton from '../components/SignUpButton'
import UserContext from '../util/User'

const Login = (props) => {
  const { navigation } = props
  const {setUser} = useContext(UserContext)
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    // Handle login logic here
  }

  return (
    <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <SimpleLineIcons
              name="login"
              size={75}
              color={'#006A42'}
              style={{ marginBottom: 30, paddingRight:20}}
            />
            <Field
              placeholder="Username"
              value={userName}
              onChangeText={setUsername}
            />
            <Field
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <SignUpButton btnLabel="Login" Press={handleLogin} />
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>No account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginTop: -200
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  signupText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  signupLink: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006A42'
  }
})

export default Login
