import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import axios from 'axios';

const DeletePop = ({ visible, onClose, userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.29.230:3000/api/user/delete?userId=1`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      onDelete(); // Notify parent about successful deletion
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Confirm Deletion</Text>
        <Text style={styles.message}>Are you sure you want to delete this user?</Text>
        <Button title="Delete" onPress={handleDelete} color="red" />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default DeletePop;