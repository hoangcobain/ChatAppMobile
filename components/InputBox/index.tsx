import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { Message, ChatRoom } from "../../src/models";
import EmojiSelector from "react-native-emoji-selector";

const InputBox = ({ chatRoom }) => {
  const [message, setMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };

  const onSendPress = async () => {
    //send a message to the backend
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );

    updateLastMessage(newMessage);
    setMessage("");
    setIsEmojiOpen(false);
  };

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      ChatRoom.copyOf(chatRoom, (updateChatRoom) => {
        updateChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

  return (
    <View style={[styles.row, { height: isEmojiOpen ? "67%" : "auto" }]}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Pressable
            onPress={() => {
              setIsEmojiOpen((currentValue) => !currentValue);
            }}
          >
            <FontAwesome5 name="laugh-beam" size={24} color="grey" />
          </Pressable>
          <TextInput
            placeholder="Type a message"
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
          {!message && (
            <Fontisto
              name="camera"
              size={24}
              color="grey"
              style={styles.icon}
            />
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
      {isEmojiOpen && (
        <EmojiSelector
          onEmojiSelected={(emoji) =>
            setMessage((currentMessage) => currentMessage + emoji)
          }
          columns={8}
          theme={"white"}
        />
      )}
    </View>
  );
};

export default InputBox;
