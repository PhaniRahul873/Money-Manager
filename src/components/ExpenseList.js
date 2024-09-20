import {React,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert
} from 'react-native'
import { MaterialCommunityIcons,FontAwesome,Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { deleteExpense } from "../util/Api";


const ExpenseList = (props) => {
    const {icon,description,color,amount,category,user,timeStamp,setChange,balance} = props
    const [listColor,setColor] = useState('ghostwhite')
    const [modalVisible,setModalVisible] = useState(false)

    const handleDelete = () => {
        const expense = {
            "user":user,
            "timeStamp":timeStamp,
            "amount":amount,
            "category":category
        }
        if(category==="Income"){
            if(amount>balance){
                Alert.alert("Cannot delete this Income")
            }else{
                deleteExpense(expense).then((data) => {setChange(data.currentBalance)})
                Alert.alert("Deleted Income") 
            }
        }else{
            deleteExpense(expense).then((data) => {setChange(data.currentBalance)})
            Alert.alert("Deleted Expense")
        }
        setModalVisible(false)
    }

    const [type,paint] = category === "Income" ? ['plus','green']:['minus','red']
    return (
        <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>setModalVisible(!modalVisible)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.backWrap}>
                        <View style={styles.popWrap}>
                            <Text style={styles.deleteText}>Delete expense?</Text>
                            <View style={styles.endButtons}>
                                <Button
                                title="cancel"
                                onPress={()=> setModalVisible(!modalVisible)}
                                />
                                <Button 
                                title="delete"
                                color={'red'}
                                onPress={handleDelete}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Pressable
            onPressIn={()=>{
                // console.log('just pressed')
                setColor('lightcyan')
            }}
            onPressOut={()=>{
                // console.log('removed finger')
                setColor('ghostwhite')
            }}
            onPress={()=>{console.log('pressed and removed')}}
            onLongPress={()=>{
                console.log('long pressed')
                setModalVisible(true)
            }}
            >
                <View style={[styles.items,styles.shadowProp,{backgroundColor:listColor}]}>
                    <MaterialCommunityIcons name={icon} size={36} color={color} />
                    <LinearGradient colors={['transparent','white']} style={styles.line}/>
                    <View style={styles.textWrap}>
                        <Text style={styles.descWrap}>{description}</Text>
                        <Text style={styles.amountWrap}>
                            <FontAwesome name="rupee" size={22} color="black" />
                            {` ${amount}`}
                        </Text>
                    </View>
                    <View>
                        <Feather name={type} size={20} color={paint} />
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    items: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:15,
        borderRadius:10
    },
    shadowProp: {  
        shadowOffset: {width: -2, height: 5},  
        shadowColor: 'black',  
        shadowOpacity: 0.2,  
        shadowRadius: 5,
    },
    line:{
        height:'100%',
        width:1,
        marginLeft:10
    }, 
    textWrap:{
        flex:1,
        marginLeft:20
    },
    descWrap:{
        fontSize:20,
        fontWeight:'300'
    },
    amountWrap:{
        fontSize:24,
        fontWeight:'500',
    },
    backWrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    popWrap: {
        backgroundColor: "white",
        width: "60%",
        height:100,
        padding: 20,
        borderRadius: 10,
    },
    deleteText :{
        alignSelf:'center',
        fontWeight:'500',
        fontSize:20
    },
    endButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop:10
    },
})

export default ExpenseList