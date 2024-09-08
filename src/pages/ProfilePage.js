import React, { useEffect, useState,useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import UserContext from "../util/User";
import Icon from "../components/Icon"
import UpdatePop from "../components/UpdatePop"
import DeletePop from "../components/DeletePop"
import { getUserDetails } from "../util/Api";
import Ionicons from '@expo/vector-icons/Ionicons'
import { Alert } from 'react-native'

const ProfilePage = (props) => {
  const { navigation } = props
  const {user} = useContext(UserContext)
  const [valid,setValid] = useState(true)
  const [userDetails, setUserDetails] = useState(null)
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const fetchUserDetails = () => {
    getUserDetails(user).then((data) => {
        console.log('UserDetails',data)
        if (data) {setUserDetails(data)}
    })
  }
  useEffect (() => {
      if (valid){
          fetchUserDetails()
          setValid(false)
      }
  },[valid])

  const handleDeleteSuccess = () => {
    setUserDetails(null);
    setIsDeleteModalVisible(false);
  };

  const handleUpdate = () => {
    setIsUpdateModalVisible(true);
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleSignOut = () => {
    Alert.alert('Signing Out from the App');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleSignOut}>
          <Ionicons style={styles.signOut} name="exit" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profile}>
          <Icon name={"user-circle-o"} size={150} color={"teal"} />
        </View>

        <View style={styles.detailsContainer}>
          {userDetails ? (
            <>
              <View style={styles.detailBlock}>
                <Text style={styles.label}>User Name</Text>
                <Text style={styles.value}>{userDetails.userName}</Text>
              </View>

              <View style={styles.detailBlock}>
                <Text style={styles.label}>Password</Text>
                <Text style={styles.value}>{userDetails.passwordHash}</Text>
              </View>

              <View style={styles.detailBlock}>
                <Text style={styles.label}>Creation Date</Text>
                <Text style={styles.value}>{userDetails.createDate}</Text>
              </View>

              <View style={styles.detailBlock}>
                <Text style={styles.label}>Current Balance</Text>
                <Text style={styles.value}>{userDetails.currentBalance}</Text>
              </View>

              <View style={styles.detailBlock}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{userDetails.email}</Text>
              </View>
            </>
          ) : (
            <Text>No user details available</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Include UpdatePop Modal */}
      {userDetails && (
        <>
          <UpdatePop
            visible={isUpdateModalVisible}
            onClose={() => setIsUpdateModalVisible(false)}
            userDetails={userDetails}
            onUpdate={setValid}
          />
          <DeletePop
            visible={isDeleteModalVisible}
            onClose={() => setIsDeleteModalVisible(false)}
            userId={userDetails.userId}
            onDelete={handleDeleteSuccess}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lavender",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  profile: {
    alignItems: "center",
    padding: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailBlock: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  signOut:{
    flexDirection:'row',
    alignSelf:'flex-end',
    paddingTop:30,
    paddingRight:20
  },
});

export default ProfilePage;
