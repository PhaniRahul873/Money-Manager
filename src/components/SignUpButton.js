import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

export default function SignUpButton({ btnLabel, Press}) {
  return (
    <TouchableOpacity
    onPress={Press}
      style={styles.button}>
      <Text style={styles.text}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: 'midnightblue',
    borderRadius: 100,
    alignItems: 'center',
    width: 350,
    paddingVertical: 5,
    marginVertical: 10
  },
  text:{
    color:'white',
    fontSize: 25,
    fontWeight: 'bold'
  }
})