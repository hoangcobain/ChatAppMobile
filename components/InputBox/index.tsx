import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./style";
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

const InputBox = () => {
  const [message, setMessage] = useState("");

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };

  const onSendPress = () => {
    //send a message to the backend
    console.warn(`Sending ${message}`);
    setMessage("");
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder="Type a message"
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && (
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <FontAwesome name="microphone" size={24} color="white" />
          ) : (
            <MaterialIcons name="send" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
