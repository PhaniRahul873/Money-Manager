import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require("../../assets/money.jpg")} 
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default Background;