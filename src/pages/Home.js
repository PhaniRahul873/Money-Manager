import React from "react";
import { useState,useEffect } from "react";
import { View,StyleSheet,SafeAreaView,Text,FlatList } from "react-native";
import { getBalance,getRecentTransactions } from "../util/Api"
import ExpenseList from "../components/ExpenseList";
import ExpensePop from "../components/ExpensePop";
import DayDate from "../components/DayDate";
import IconList from "../util/IconList";
import AppName from "../components/AppName";
import Icon from "../components/Icon";

const Home = () => {
    const [balance,setBalance] = useState("no money")
    const [dataList,setDataList] = useState([])
    const [valid,setValid] = useState(true)
    const fetchData = () => {
        getBalance(setBalance)
        getRecentTransactions(setDataList)
    }
    useEffect (() => {
        if (valid){
            fetchData()
            setValid(false)
        }
    },[valid])

    const renderItem = ({ item }) => {
        const category = item.category
        const { icon,color } = IconList[category]
        return (
            <ExpenseList     
            icon={icon}
            color={color}
            category={category}
            description={item.description}
            amount={item.amount}
            user={item.userId}
            timeStamp={item.timeStamp}
            />
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={[styles.wrap,{marginTop:10}]}>
                <AppName />
                <View style={{flex:1}}/>
                <DayDate/>
            </View>
            <View style={[styles.wrap,{marginTop:40}]}>
                <View>
                    <Text style={styles.balanceText}>Balance:</Text>
                    <View style={styles.balanceStyle}>
                        <Icon name={'rupee'} size={25} color={"black"} />
                        <Text style={styles.balanceValue}>{balance}</Text>
                    </View>
                </View>
                <View>
                    <ExpensePop setValid={setValid}/>
                </View>
            </View>
            <View style={[{paddingHorizontal:20},{marginTop:20}]}>
                <Text style={styles.spendText}>RECENTS</Text>
            </View>
            <View style={styles.listWrap}>
                <FlatList
                    data={dataList}
                    renderItem={renderItem}
                    keyExtractor={item=>item.id}
                    ItemSeparatorComponent={() => <View style={{height:10}}/>}
                    contentContainerStyle={{paddingBottom:200}}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lavender',
        // alignItems:'center'
    },
    shadowProp: {  
        shadowOffset: {width: -2, height: 5},  
        shadowColor: 'black',  
        shadowOpacity: 0.2,  
        shadowRadius: 5,
    },
    wrap:{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems:'center'
    },
    balanceText:{
        fontSize:20,
        fontWeight:'300'
    },
    balanceStyle:{
        flexDirection:'row',
        alignItems:'center',
    },
    balanceValue:{
        fontSize:30,
        fontWeight:'600',
        color:'black',
        marginLeft:5
    },
    spendText:{
        fontSize:24,
        fontWeight:'500',
    },
    listWrap:{
        padding:10
    }
})

export default Home