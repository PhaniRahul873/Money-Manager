import React, { useState,useContext, useEffect } from 'react'
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
import { checkUserDetails } from '../util/Api'

const Login = (props) => {
  const { navigation } = props
  const {setUser} = useContext(UserContext)
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)

  const handleLogin = async () => {
    try {
      const result = await checkUserDetails(userName, password);
      
      if (result && Object.keys(result).length > 0) {
        setErrorFlag(false);  
        setUser(result.userId);
        navigation.navigate('Tabs');
      } else {
        setErrorFlag(true); 
      }
    } catch {
      setErrorFlag(true); 
    }
  }

  useEffect(() => {
    <ErrorComponent />
  },[errorFlag]);

  const ErrorComponent=() => {
    if(errorFlag) {
      return (
        <Text style={styles.error}> Incorrect UserName/Password</Text>
      )
    } else {
      return;
    }
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
              placeholder="Username/Email"
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
            <ErrorComponent />
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
  },
  error: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  }
})

export default Login
