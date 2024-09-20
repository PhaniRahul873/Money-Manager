import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { getBalance, getRecentTransactions } from '../util/Api'
import ExpenseList from '../components/ExpenseList'
import ExpensePop from '../components/ExpensePop'
import DayDate from '../components/DayDate'
import IconList from '../util/IconList'
import AppName from '../components/AppName'
import Icon from '../components/Icon'
import UserContext from '../util/User'

const Home = () => {
  const { user } = useContext(UserContext)
  const [balance, setBalance] = useState(0)
  const [dataList, setDataList] = useState([])
  const [valid, setValid] = useState(true)
  const [loading, setLoading] = useState(false)
  // console.log(user)
  const fetchData = () => {
    setLoading(true)
    getBalance(user).then((currentBalance) => {
      console.log('displaying current balance', currentBalance)
      if (currentBalance) {
        setBalance(currentBalance)
      }
    })
    getRecentTransactions(user).then((data) => {
      // console.log('datalist',data)
      if (data) {
        setDataList(data)
      }
      setLoading(false)
    })
  }
  useEffect(() => {
    if (valid) {
      fetchData()
      setValid(false)
    }
  }, [valid])

  const [change, setChange] = useState(balance)

  useEffect(() => {
    if (change !== balance) {
      setValid(true)
    }
  }, [change])

  const renderItem = ({ item }) => {
    const category = item.category
    const { icon, color } = IconList[category]
    return (
      <ExpenseList
        icon={icon}
        color={color}
        category={category}
        description={item.description}
        amount={item.amount}
        user={item.userId}
        timeStamp={item.timeStamp}
        setChange={setChange}
        balance={balance}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.wrap, { marginTop: 10 }]}>
        <AppName />
        <View style={{ flex: 1 }} />
        <DayDate />
      </View>
      <View style={[styles.wrap, { marginTop: 40 }]}>
        <View>
          <Text style={styles.balanceText}>Balance:</Text>
          <View style={styles.balanceStyle}>
            <Icon name={'rupee'} size={25} color={'black'} />
            <Text style={styles.balanceValue}>{balance}</Text>
          </View>
        </View>
        <View>
          <ExpensePop setChange={setChange} balance={balance} />
        </View>
      </View>
      <View style={[{ paddingHorizontal: 20 }, { marginTop: 20 }]}>
        <Text style={styles.spendText}>RECENTS</Text>
      </View>
      <View style={{ padding: 10 }}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'black'} />
        ) : dataList.length === 0 ? (
          <View style={styles.noTransactionsWrap}>
            <Text style={[{fontSize:30},{color:'darkred'}]}>No recent transactions</Text>
            <Text style={[{fontSize:30},{color:'green'}]}>Add Now!</Text>
          </View>
        ) : (
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item) => item.timeStamp}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{ paddingBottom: 200 }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender'
    // alignItems:'center'
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  balanceText: {
    fontSize: 20,
    fontWeight: '300'
  },
  balanceStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    marginLeft: 5
  },
  spendText: {
    fontSize: 24,
    fontWeight: '500'
  },
  noTransactionsWrap:{
    justifyContent: 'center', 
    alignItems: 'center' , 
    marginTop: 100
  }
})

export default Home
