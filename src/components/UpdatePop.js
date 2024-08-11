import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  Button
} from "react-native";
import axios from 'axios';

const UpdatePop = ({ visible, onClose, userDetails, onUpdate }) => {
  const [formData, setFormData] = useState(userDetails);

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put('http://192.168.29.230:3000/api/user/update?userId=1', formData, {
        headers: {
          'Content-Type': 'application/json',
          
        }
      });
      alert('User details updated successfully');
      onUpdate(response.data); 
      onClose(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit User Details</Text>

          <TextInput
            style={styles.input}
            placeholder="User Name"
            value={formData.userName}
            onChangeText={(text) => handleInputChange('userName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password Hash"
            value={formData.passwordHash}
            onChangeText={(text) => handleInputChange('passwordHash', text)}
          />
          {/* <TextInput
            style={styles.input}
            placeholder="Creation Date"
            value={formData.createDate}
            onChangeText={(text) => handleInputChange('createDate', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Current Balance"
            value={formData.currentBalance}
            onChangeText={(text) => handleInputChange('currentBalance', text)}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />

          <View style={styles.modalButtons}>
            <Button title="Save" onPress={handleUpdate} color="#3498db" />
            <Button title="Cancel" onPress={onClose} color="#e74c3c" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default UpdatePop;