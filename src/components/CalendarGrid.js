import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Button, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icons

const CalendarGrid = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth()); // State to keep track of the current month index
  const [selectedDay, setSelectedDay] = useState(null); // State to keep track of the selected day
  const [prices, setPrices] = useState({}); // State to store pricing data for each day
  const [itemName, setItemName] = useState(''); // State to store the entered item name
  const [itemPrice, setItemPrice] = useState(''); // State to store the entered item price
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the visibility of the modal
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false); // State to control the visibility of the expense modal

  // Dummy data for months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Function to handle navigation to the next month
  const goToNextMonth = () => {
    setCurrentMonthIndex(prevIndex => (prevIndex === 11 ? 0 : prevIndex + 1));
    setSelectedDay(null); // Reset selected day when navigating to the next month
  };

  // Function to handle navigation to the previous month
  const goToPreviousMonth = () => {
    setCurrentMonthIndex(prevIndex => (prevIndex === 0 ? 11 : prevIndex - 1));
    setSelectedDay(null); // Reset selected day when navigating to the previous month
  };

  // Function to handle day selection
  const handleDayPress = (day) => {
    setSelectedDay(day);
    setIsModalVisible(true); // Show the modal when a day is selected
  };

  // Function to handle item name input
  const handleItemNameChange = (name) => {
    setItemName(name);
  };

  // Function to handle item price input
  const handleItemPriceChange = (price) => {
    setItemPrice(price);
  };

  // Function to handle price submission
  const handleSubmitPrice = () => {
    setPrices(prevPrices => ({
      ...prevPrices,
      [months[currentMonthIndex]]: {
        ...prevPrices[months[currentMonthIndex]],
        [selectedDay]: { name: itemName, price: itemPrice },
      },
    }));
    setIsModalVisible(false); // Hide the modal after submitting the price
    setItemName(''); // Clear the entered item name after submission
    setItemPrice(''); // Clear the entered item price after submission
  };

  // Function to handle opening the expense modal
  const handleOpenExpenseModal = () => {
    setIsModalVisible(false); // Close the item modal
    setIsExpenseModalVisible(true); // Open the expense modal
  };
  const handleModal = () => {
    setIsModalVisible(false); // Close the item modal
  };
  // Function to close the expense modal
  const handleCloseExpenseModal = () => {
    setIsExpenseModalVisible(false);
  };

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Get the total number of days in the current month
  const totalDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const daysOfMonth = Array.from({ length: totalDaysInMonth }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
         <Text style={styles.monthYearHeading}>Expenses</Text>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Icon name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthYearHeading}>{months[currentMonthIndex]} {currentYear}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Icon name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={daysOfMonth}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dayItem, item === selectedDay && styles.selectedDay]}
            onPress={() => handleDayPress(item)}
          >
            <Text style={styles.dayText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item}`}
        numColumns={6} // Display 6 days per row
      />
      {/* Modal for entering item details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={itemName}
              onChangeText={handleItemNameChange}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={itemPrice}
              onChangeText={handleItemPriceChange}
            />
            <Button title="Submit" onPress={handleSubmitPrice} />
            <Button title="Show Expenses" onPress={handleOpenExpenseModal} />
            <Button title="Close" onPress={handleModal} />
          </View>
        </View>
      </Modal>
      {/* Modal for expense confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isExpenseModalVisible}
        onRequestClose={() => setIsExpenseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Do you want to go for expenses on this day?</Text>
            <View style={styles.buttonContainer}>
              <Button title="Yes" onPress={() => setIsExpenseModalVisible(false)} />
              <Button title="No" onPress={() => setIsExpenseModalVisible(false)} />
            </View>
            <Button title="Close" onPress={handleCloseExpenseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const dayItemWidth = width / 6; // Adjust the width of each day item to occupy one-sixth of the screen width
const dayItemHeight = height / 7; // Adjust the height of each day item to occupy one-seventh of the screen height

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0', // Background color for the entire screen
    },
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      marginBottom: 10,
      marginTop: 30,
    },
    monthYearHeading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333', // Text color for the month and year heading
    },
    dayItem: {
      width: dayItemWidth,
      height: dayItemHeight,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc', // Border color for each day item
      borderRadius: 10,
      backgroundColor: '#fff', // Background color for each day item
      marginBottom: 5,
      position: 'relative',
    },
    selectedDay: {
      backgroundColor: '#6495ED', // Background color when a day is selected
    },
    dayText: {
      fontSize: 18,
      color: '#333', // Text color for the day number
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
      color: '#333', // Text color for modal text
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
  });

export default CalendarGrid;