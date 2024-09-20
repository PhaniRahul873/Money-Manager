import React from "react";
import { Modal, View, Text, Button, StyleSheet,Alert } from "react-native";
import { deleteUser } from "../util/Api";

const DeletePop = ({ visible, onClose, userId, onDelete }) => {
  const handleDelete = async () => {
    deleteUser(userId).then((data)=>{})
    Alert.alert('Success', 'Account Deleted')
    onClose();
    onDelete();
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
          <Text style={styles.modalTitle}>Confirm Deletion</Text>
          <Text style={styles.modalMessage}>Are you sure you want to delete this account?</Text>

          <View style={styles.modalButtons}>
            <Button title="Delete" onPress={handleDelete} color="#e74c3c" />
            <Button title="Cancel" onPress={onClose} color="#3498db" />
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
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DeletePop;