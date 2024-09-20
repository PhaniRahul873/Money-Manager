import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PieColors from "../util/PieColors";

// const getTextColor = (backgroundColor) => {
//   const color = backgroundColor.replace('#', '');
//   const r = parseInt(color.substring(0, 2), 16);
//   const g = parseInt(color.substring(2, 4), 16);
//   const b = parseInt(color.substring(4, 6), 16);

//   const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

//   return brightness < 128 ? '#FFFFFF' : '#000000';
// }

const PieList = (props) => {
  const { color, category, value, percentage } = props;
  const textColor = PieColors[category].text;

  return (
    <View style={[styles.list,styles.shadowProp, { backgroundColor: color }]}>
      <View style={styles.tableData}>
        <Text style={{ color: textColor }}>{category} </Text>
        <Text style={{ color: textColor }}>Rs.{value}</Text>
        <Text style={{ color: textColor }}>{percentage} % </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    justifyContent: 'space-around',
    borderRadius:10,
  },
  tableData: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  shadowProp: {
    shadowOffset: {width: -2, height: 5},  
    shadowColor: 'black',  
    shadowOpacity: 0.2,  
    shadowRadius: 5,
  },
});

export default PieList;