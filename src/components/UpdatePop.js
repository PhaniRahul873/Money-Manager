import React, { useState } from "react";
import {View,Text,StyleSheet,TextInput,Modal,Button,Alert,TouchableWithoutFeedback,Keyboard
} from "react-native";
import { updateUserDetails } from "../util/Api";

const UpdatePop = (props) => {
  const { visible, onClose, userDetails, onUpdate } = props;
  const [userName, setUserName] = useState(userDetails.userName);
  const [passwordHash, setPasswordHash] = useState(userDetails.passwordHash);
  const [email, setEmail] = useState(userDetails.email);

  const handleUpdate = () => {
    const updateUser = {
      email: email,
      passwordHash: passwordHash,
      userId: userDetails.userId,
      userName: userName,
    };
    updateUserDetails(updateUser).then((data) => {onUpdate(data)});
    onClose();
    Alert.alert("Success", "User Details updated");
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit User Details</Text>

            <TextInput
              style={styles.input}
              placeholder="User Name"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password Hash"
              value={passwordHash}
              onChangeText={(text) => setPasswordHash(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleUpdate} color="#3498db" />
              <Button title="Cancel" onPress={onClose} color="#e74c3c" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default UpdatePop;