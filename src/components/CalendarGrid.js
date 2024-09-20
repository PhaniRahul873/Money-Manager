import React, { useState } from 'react';
import {View,FlatList,Text,StyleSheet,TouchableOpacity,Dimensions,Pressable,SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

const CalendarGrid = (props) => {
  const {navigation} = props;
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [currentYear,setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDay, setSelectedDay] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  const daysOfMonth = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: totalDaysInMonth }, (_, index) => index + 1)
  ];

  const goToNextMonth = () => {
    setCurrentMonthIndex((prevIndex) =>{
      if(prevIndex===11){
        setCurrentYear(currentYear+1)
        return 0;
      }else{return prevIndex+1;}
    });
    setSelectedDay(null);
  };

  const goToPreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => {
      if(prevIndex===0){
        setCurrentYear(currentYear-1)
        return 11;
      }else{return prevIndex-1;}
    });
    setSelectedDay(null);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const requestDate = (date) => {
    const day = date.getDate();
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    const dayWithSuffix = `${day}${suffix(day)}`;
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayWithSuffix} ${month} ${year}`;
  };
  
  const handleDayPress = (day) => {
    const dateOfPressedDay = new Date(currentYear, currentMonthIndex, day);
    
    const startDate = new Date(dateOfPressedDay);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(dateOfPressedDay);
    endDate.setHours(23, 59, 59, 999);
    
    const startingDate = formatDate(startDate);
    const endingDate = formatDate(endDate);
    const dateDetails = requestDate(startDate);
    
    navigation.navigate("Tabs", { 
      screen: 'Transactions', 
      params: { startingDate,endingDate,dateDetails }
    });

    setSelectedDay(day);
};
  const handleBackPress = () => {
    navigation.navigate('Tabs', { screen: 'Transactions' });
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
      style={({pressed})=>[
        styles.dayItem,
        {backgroundColor:!item ? 'transparent' : pressed ? 
        'lightseagreen' : item===selectedDay ? 'lightseagreen' : 'lavender'},
        {borderWidth : !item ? 0:1},
      ]}
      onPress={() =>{
        handleDayPress(item)
      }}
      disabled={!item}
    >
      {/* {item ? <Text style={styles.dayText}>{item}</Text> : null} */}
      <View style = {[{flexDirection:'column'},{alignItems:'center'}]}>
      <Text style={styles.dayText}>{item}</Text>
      {/* <Entypo name="dot-single" size={20} color="red" /> */}
      </View>
    </Pressable>
    )
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses by Date</Text>
        <View style={{flex: 1}}/>
        <TouchableOpacity onPress={handleBackPress}>
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.navigation}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Icon name="angle-double-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthYearHeading}>
          {months[currentMonthIndex]} {currentYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Icon name="angle-double-right" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.dayOfWeek}>{day}</Text>
        ))}
      </View>

      <FlatList
        data={daysOfMonth}
        style={{ marginTop: 10 }}
        renderItem={renderItem}
        keyExtractor={(item, index) => item ? `${item}-${index}` : `empty-${index}`}
        numColumns={7}
      />
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
const dayItemWidth = width / 7.3;
const dayItemHeight = height / 13;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightsteelblue',
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  monthYearHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayOfWeek: {
    width: dayItemWidth,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  dayItem: {
    width: dayItemWidth,
    height: dayItemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 1,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CalendarGrid;