import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
  Button
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateDisplay from '../util/DateDisplay';
import { getFormattedDate } from '../util/DateConversion';
import { getTransactionsList } from '../util/Api';

const TransactionList = () => {
  const obj = new DateDisplay();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState(obj.get_weeks_data());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactionsList(startDate, endDate);
        if (data) {
          const transactions = transformData(data);
          setTransactionData(transactions);
        }
      } catch (err) {
        console.log('Error occurred while fetching', err);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  const ModifyStartTimeEndTime = () => {
    setStartDate(getFormattedDate(frequency[period].startDate));
    setEndDate(getFormattedDate(frequency[period].endDate));
  };

  const PerformWeekly = () => {
    setFrequency(obj.get_weeks_data());
    ModifyStartTimeEndTime();
  };

  const PerformMonthly = () => {
    setFrequency(obj.get_months_data());
    ModifyStartTimeEndTime();
  };

  const PerformYearly = () => {
    setFrequency(obj.get_years_data());
    ModifyStartTimeEndTime();
  };

  const [period, setPeriod] = useState(frequency.length - 1);

  const moveLeft = () => {
    setPeriod(period - 1 < 0 ? 0 : period - 1);
    ModifyStartTimeEndTime();
  };

  const moveRight = () => {
    setPeriod(period + 1 > frequency.length - 1 ? frequency.length - 1 : period + 1);
    ModifyStartTimeEndTime();
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const transformData = (transactions) => {
    const groupedByDate = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.timeStamp.split(' ')[0]);
      const formattedDate = formatDate(date);

      if (!acc[formattedDate]) {
        acc[formattedDate] = { date: formattedDate, data: [] };
      }

      acc[formattedDate].data.push({
        category: transaction.category,
        description: transaction.description,
        amount: String(transaction.amount),
        type: transaction.transactionType === 'Expense' ? 'Expenditure' : 'Income'
      });

      return acc;
    }, {});

    return Object.values(groupedByDate);
  };

  const getColor = (category) => {
    return category === 'Income' ? 'blue' : 'red';
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemText}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text style={[styles.amount, { color: getColor(item.type) }]}>Rs.{item.amount}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { date } }) => (
    <View style={styles.header}>
      <Text>{date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.optionButton} onPress={PerformWeekly}>
          <Text style={styles.optionButtonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={PerformMonthly}>
          <Text style={styles.optionButtonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={PerformYearly}>
          <Text style={styles.optionButtonText}>Yearly</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalSlider}>
        <View style={styles.contentItem}>
          <Text>{frequency[period].range}</Text>
        </View>
        <TouchableOpacity style={styles.arrowLeft} onPress={moveLeft}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowRight} onPress={moveRight}>
          <AntDesign name="rightcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <SectionList
        sections={transactionData}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
      <CalendarGrid />
    </View>
  );
};

const CalendarGrid = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [prices, setPrices] = useState({});
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const goToNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonthIndex((prevIndex) => prevIndex + 1);
    }
    setSelectedDay(null);
  };

  const goToPreviousMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonthIndex((prevIndex) => prevIndex - 1);
    }
    setSelectedDay(null);
  };

  const goToYear = (year) => {
    setCurrentYear(year);
    setSelectedDay(null);
  };

  const handleDayPress = (day) => {
    setSelectedDay(day);
    setIsModalVisible(true);
  };

  const handleItemNameChange = (name) => {
    setItemName(name);
  };

  const handleItemPriceChange = (price) => {
    setItemPrice(price);
  };

  const handleSubmitPrice = () => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [currentYear]: {
        ...(prevPrices[currentYear] || {}),
        [months[currentMonthIndex]]: {
          ...(prevPrices[currentYear]?.[months[currentMonthIndex]] || {}),
          [selectedDay]: { name: itemName, price: itemPrice }
        }
      }
    }));
    setIsModalVisible(false);
    setItemName('');
    setItemPrice('');
  };

  const handleOpenExpenseModal = () => {
    setIsModalVisible(false);
    setIsExpenseModalVisible(true);
  };

  const handleCloseExpenseModal = () => {
    setIsExpenseModalVisible(false);
  };

  const totalDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const daysOfMonth = Array.from({ length: totalDaysInMonth }, (_, index) => index + 1);

  return (
    <View style={calendarStyles.container}>
      <View style={calendarStyles.navigation}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Icon name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={calendarStyles.monthYearHeading}>{months[currentMonthIndex]} {currentYear}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Icon name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={calendarStyles.yearNavigation}>
        <Button title="2023" onPress={() => goToYear(2023)} />
        <Button title="2024" onPress={() => goToYear(2024)} />
        <Button title="2025" onPress={() => goToYear(2025)} />
      </View>
      <FlatList
        data={daysOfMonth}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              calendarStyles.dayItem,
              selectedDay === item && calendarStyles.selectedDayItem
            ]}
            onPress={() => handleDayPress(item)}
          >
            <Text>{item}</Text>
            {prices[currentYear]?.[months[currentMonthIndex]]?.[item] && (
              <Text>
                {prices[currentYear][months[currentMonthIndex]][item].name}: Rs.
                {prices[currentYear][months[currentMonthIndex]][item].price}
              </Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.toString()}
        numColumns={7}
      />
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={calendarStyles.modalContainer}>
          <View style={calendarStyles.modalContent}>
            <Text style={calendarStyles.modalHeading}>Add Price for {selectedDay} {months[currentMonthIndex]}</Text>
            <TextInput
              placeholder="Item Name"
              value={itemName}
              onChangeText={handleItemNameChange}
              style={calendarStyles.input}
            />
            <TextInput
              placeholder="Price"
              value={itemPrice}
              onChangeText={handleItemPriceChange}
              keyboardType="numeric"
              style={calendarStyles.input}
            />
            <Button title="Submit" onPress={handleSubmitPrice} />
            <Button title="Add New Expense" onPress={handleOpenExpenseModal} />
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Modal visible={isExpenseModalVisible} transparent={true} animationType="slide">
        <View style={calendarStyles.modalContainer}>
          <View style={calendarStyles.modalContent}>
            <Text style={calendarStyles.modalHeading}>Add New Expense for {selectedDay} {months[currentMonthIndex]}</Text>
            <TextInput
              placeholder="Item Name"
              value={itemName}
              onChangeText={handleItemNameChange}
              style={calendarStyles.input}
            />
            <TextInput
              placeholder="Price"
              value={itemPrice}
              onChangeText={handleItemPriceChange}
              keyboardType="numeric"
              style={calendarStyles.input}
            />
            <Button title="Submit" onPress={handleSubmitPrice} />
            <Button title="Close" onPress={handleCloseExpenseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const { width, height } = Dimensions.get('window');
const dayItemWidth = width / 7; // Adjust the width of each day item to occupy one-sixth of the screen width
const dayItemHeight = height / 7; // Adjust the height of each day item to occupy
const calendarStyles = StyleSheet.create({
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
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: -280,
  },
  yearNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 1,
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
  selectedDayItem: {
    backgroundColor: 'lightblue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get('window').width - 40,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'lavender',
  },
  header: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowLeft: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  optionButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tableData: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    color: '#333',
    fontWeight: 'bold',
  },
  horizontalSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    paddingTop: 50,
    justifyContent: 'space-around',
  },
  contentItem: {
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionList;
