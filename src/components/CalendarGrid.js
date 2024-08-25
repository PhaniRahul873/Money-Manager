import React, { useState } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const CalendarGrid = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  )
  const [selectedDay, setSelectedDay] = useState(null)
  const [color, setColor] = useState('lavender')

  // Dummy data for months
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Function to handle navigation to the next month
  const goToNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1))
    setSelectedDay(null) // Reset selected day when navigating to the next month
  }

  // Function to handle navigation to the previous month
  const goToPreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1))
    setSelectedDay(null) // Reset selected day when navigating to the previous month
  }

  // Function to handle day selection
  const handleDayPress = (day) => {
    console.log('long pressed', day)
    setSelectedDay(day)
  }

  // Get the current year
  const currentYear = new Date().getFullYear()

  // Get the total number of days in the current month
  const totalDaysInMonth = new Date(
    currentYear,
    currentMonthIndex + 1,
    0
  ).getDate()
  const daysOfMonth = Array.from(
    { length: totalDaysInMonth },
    (_, index) => index + 1
  )

  return (
    <View style={styles.container}>
      <Text style={styles.monthYearHeading}>Expenses</Text>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Icon name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthYearHeading}>
          {months[currentMonthIndex]} {currentYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Icon name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={daysOfMonth}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.dayItem,
              {
                backgroundColor: pressed
                  ? color
                  : item === selectedDay
                  ? color
                  : 'lavender'
              }
            ]}
            onPressIn={() => {
              setColor('lightseagreen')
              setSelectedDay(item)
            }}
            onPressOut={() => {
              setColor('lavender')
            }}
            onPress={() => {
              console.log('pressed and removed')
              console.log(selectedDay)
            }}
            onLongPress={() => handleDayPress(item)} // Pass the `item` (day) to `handleDayPress`
          >
            <Text style={styles.dayText}>{item}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => `${item}`}
        numColumns={6} // Display 6 days per row
      />
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const dayItemWidth = width / 6 // Adjust the width of each day item to occupy one-sixth of the screen width
const dayItemHeight = height / 9 // Adjust the height of each day item to occupy one-seventh of the screen height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightsteelblue' // Background color for the entire screen
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 30
  },
  monthYearHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333' // Text color for the month and year heading
  },
  dayItem: {
    width: dayItemWidth,
    height: dayItemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Border color for each day item
    borderRadius: 10,
    backgroundColor: 'lavender', // Background color for each day item
    marginTop: 5,
    position: 'relative'
  },
  selectedDay: {
    backgroundColor: 'red' // Background color when a day is selected
  },
  dayText: {
    fontSize: 18,
    color: '#333' // Text color for the day number
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333' // Text color for modal text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})

export default CalendarGrid