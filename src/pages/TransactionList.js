import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateDisplay from '../util/DateDisplay';
import { getFormattedDate } from '../util/DateConversion';
import { getTransactionsList } from '../util/Api';

const TransactionList = (props) => {
  const {navigation} = props
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

  const handleCalenderPress = () => {
    console.log('pressed calender')
    navigation.navigate('Calender')
  }

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
      <View>
        <TouchableOpacity onPress={handleCalenderPress}>
          <AntDesign style={styles.calender} name="calendar" size={30} color="rebeccapurple"/>
        </TouchableOpacity>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'lavender',
  },
  calender:{
    flexDirection:'row',
    alignSelf:'flex-end',
    paddingTop:30,
    paddingRight:20
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
    paddingTop: 20,
    justifyContent: 'space-around',
  },
  contentItem: {
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionList;