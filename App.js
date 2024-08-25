import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserProvider } from './src/util/User'
import Tabs from './src/util/Tabs'
import CalendarGrid from './src/components/CalendarGrid'
import TransactionList from './src/pages/TransactionList'
import Signup from './src/pages/Signup'
import Login from './src/pages/Login'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="Calender"
          component={CalendarGrid}
          options={{headerShown:false}}
          />
        </Stack.Navigator>
        <StatusBar style="auto" hidden={false} />
      </NavigationContainer>
    </UserProvider>
  )
}

export default App
