import { React } from 'react'
import {
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

const Field = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TextInput
        {...props}
        style={Styles.text}
        placeholderTextColor={'darkslateblue'}
      ></TextInput>
    </TouchableWithoutFeedback>
  )
}

const Styles = StyleSheet.create({
  text: {
    borderRadius: 100,
    paddingHorizontal: 10,
    width: 350,
    backgroundColor: 'rgb(220,220, 220)',
    marginVertical: 10,
    height: 40
  }
})

export default Field
