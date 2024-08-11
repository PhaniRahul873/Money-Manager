import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import axios from 'axios';
import Icon from "../components/Icon"; // Ensure the correct path
import UpdatePop from "../components/UpdatePop"; // Ensure the correct path
import DeletePop from "../components/DeletePop";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://192.168.1.34:3000/api/user?userId=1', {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Include if required
          }
        });
        setUserDetails(response.data)
      } catch (err) {
        setError('Failed to fetch user details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);


  const handleUpdateSuccess = () => {
    fetchUserDetails(); // Refresh user details after update
    setIsUpdateModalVisible(false);
  };

  const handleDeleteSuccess = () => {
    // Handle successful deletion
    setUserDetails(null); // Clear user details
    setIsDeleteModalVisible(false);
  };

  const handleUpdate = () => {
    setIsUpdateModalVisible(true); // Show the update modal
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true); // Show the delete confirmation modal
  };


  return (
    <SafeAreaView style={styles.container}>
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
                <Text style={styles.label}>User ID</Text>
                <Text style={styles.value}>{userDetails.userId}</Text>
              </View>

              <View style={styles.detailBlock}>
                <Text style={styles.label}>Password </Text>
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
            onUpdate={handleUpdateSuccess}
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
});

export default ProfilePage;
