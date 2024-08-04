import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Button,
  Text,
  View
} from 'react-native'
import PieChart from 'react-native-pie-chart'
import HorizontalSlider from 'react-horizontal-slider'
import { AntDesign } from '@expo/vector-icons'
import DateDisplay from '../util/DateDisplay'
import { getTransactionAmountByCategory } from '../util/Api'
import { getFormattedDate } from '../util/DateConversion'
import randomColor from 'randomcolor'

const PieChartStat = () => {
  const widthAndHeight = 250
  const [sliceColor, setSliceColor] = useState([randomColor()])
  const obj = new DateDisplay()
  const [frequency, setFrequency] = useState(obj.get_weeks_data())
  const [series, setSeries] = useState([100])

  const [pieChartData, setPieChartData] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const transactionType = 'Expense'

  // Whenever the parameters changes call the backend to get the data.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactionAmountByCategory(
          startDate,
          endDate,
          transactionType
        )
        setPieChartData(data)
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
  }, [startDate, endDate, transactionType])

  const [data, setData] = useState([])

  const [period, setPeriod] = useState(frequency.length - 1);

  useEffect(() => {
    setStartDate(getFormattedDate(frequency[period].startDate));
    setEndDate(getFormattedDate(frequency[period].endDate));
  }, [period,frequency]);

  const ModifyStartTimeEndTime = () => {
    setStartDate(getFormattedDate(frequency[period].startDate))
    setEndDate(getFormattedDate(frequency[period].endDate))
  }

  const PerformWeekly = () => {
    setPeriod(0)
    setFrequency(obj.get_weeks_data())
  }

  const PerformMonthly = () => {
    setPeriod(0)
    setFrequency(obj.get_months_data())
  }

  const PerformYearly = () => {
    setPeriod(0)
    setFrequency(obj.get_years_data())
  }

  const moveLeft = () => {
    setPeriod(period - 1 < 0 ? frequency.length - 1 : period - 1)
  }

  const moveRight = () => {
    setPeriod(period + 1 > frequency.length - 1 ? 0 : period + 1);
  }

  useEffect(() => {
    if (pieChartData) {
      const categories = Object.keys(pieChartData)
      let series = Object.values(pieChartData)
      let sliceColor = []
      let data = []
      for (let i = 0; i < categories.length; i++) {
        sliceColor.push(randomColor());
        const obj = {
          category: categories[i],
          value: series[i],
          color: sliceColor[i],
          percentage: Math.floor(
            (series[i] / series.reduce((acc, curr) => acc + curr, 0)) * 100
          ),
          id: i
        }
        data.push(obj)
      }
      setSliceColor(sliceColor.length > 0 ? sliceColor : ['#D3D3D3'])
      setSeries(series.length > 0 ? series : ['1']);
      setData(data);
    }
  }, [pieChartData])

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 20,
        justifyContent: 'space-around',
        backgroundColor: item.color
      }}
    >
      <View style={styles.tableData}>
        <Text>{item.category} </Text>
        <Text>Rs.{item.value}</Text>
        <Text>{item.percentage} % </Text>
      </View>
    </View>
  )

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

      <Text style={styles.title}>Monthly </Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
      />
      <Text style={styles.title}>Expense Chart</Text>
      <View style={styles.list}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender'
  },
  title: {
    fontSize: 24,
    margin: 10
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  optionButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionButtonText: {
    color: '#333',
    fontWeight: 'bold'
  },
  tableData: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    color: '#333',
    fontWeight: 'bold'
  },
  horizontalSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  scrollViewContent: {
    alignItems: 'center'
  },
  contentItem: {
    width: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowLeft: {
    position: 'absolute',
    left: 0,
    padding: 10
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    padding: 10
  }
})

export default PieChartStat
