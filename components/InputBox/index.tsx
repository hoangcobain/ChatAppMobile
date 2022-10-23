import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  PermissionsAndroid,
  Alert,
  CameraRoll,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  Fontisto,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Auth, DataStore, Storage } from "aws-amplify";
import { Message, ChatRoom } from "../../src/models";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { v4 as uuidv4 } from "uuid";

const InputBox = ({ chatRoom }) => {
  const [message, setMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  let camera: Camera;

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
    resetFields();
  };

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      ChatRoom.copyOf(chatRoom, (updateChatRoom) => {
        updateChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPress = () => {
    if (image) {
      sendImage();
    } else if (message) {
      onSendPress();
    } else {
      onMicrophonePress();
    }
  };

  const resetFields = () => {
    setMessage("");
    setIsEmojiOpen(false);
    setImage(null);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // do something
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const sendImage = async () => {
    if (!image) {
      return;
    }
    const blob = await getImageBlob();
    const { key } = await Storage.put(`${uuidv4()}.png`, blob);

    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        image: key,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );

    updateLastMessage(newMessage);
    resetFields();
  };

  const getImageBlob = async () => {
    if (!image) {
      return null;
    }
    const response = await fetch(image);
    const blob = await response.blob();
    return blob;
  };

  return (
    <View style={[styles.row, { height: isEmojiOpen ? "67%" : "auto" }]}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Pressable
            onPress={() => {
              setIsEmojiOpen((currentValue) => !currentValue);
              setImage(null);
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
          {
            <Pressable onPress={pickImage}>
              <Entypo
                name="attachment"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </Pressable>
          }

          {startCamera ? (
            <Camera
              style={{
                flex: 1,
                height: 650,
                // paddingLeft: 295,
                // paddingRight: 530,
                marginLeft: -460,
                marginRight: -80,
                elevation: 2,
                position: "relative",
                bottom: 100,
              }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          ) : (
            <Pressable onPress={__startCamera}>
              {!message && (
                <Fontisto
                  name="camera"
                  size={24}
                  color="grey"
                  style={styles.icon}
                />
              )}
            </Pressable>
          )}
        </View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>
            {message || image ? (
              <MaterialIcons name="send" size={24} color="white" />
            ) : (
              <FontAwesome name="microphone" size={24} color="white" />
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
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
          <Pressable>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => setImage(null)}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default InputBox;
