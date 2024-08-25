import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity,Text,StyleSheet } from "react-native";

const UserIcons = (props) => {
    const {icon,color,name} = props
    return (
        <TouchableOpacity style={styles.container} onPress={()=>handlePress(name)}>
        <MaterialIcons name={icon} size={30} color={color} />
        <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

const handlePress = (name) => {
    console.log('Pressed ',name)
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:10,
        alignItems:'center'
    },
    text:{
        fontSize:20,
        marginLeft:10,
    }
})

export default UserIcons