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
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  Fontisto,
  MaterialIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import { Auth, DataStore, Storage } from "aws-amplify";
import { Message, ChatRoom } from "../../src/models";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { v4 as uuidv4 } from "uuid";
import Colors from "../../constants/Colors";
import { Audio, AVPlaybackStatus } from "expo-av";
import AudioPlayer from "../AudioPlayer";
import ChatMessage from "../ChatMessage";
import { User } from "../../src/models";
import "react-native-get-random-values";

const InputBox = ({ chatRoom, messageReplyTo, removeMessageReplyTo }) => {
  const [message, setMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [image, setImage] = useState([]);
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundURI, setSoundURI] = useState<string | null>(null);

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
        replyToMessageID: messageReplyTo?.id,
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

  const onPress = async () => {
    if (image.length > 0) {
      const user = await Auth.currentAuthenticatedUser();
      const newMessage = await DataStore.save(
        new Message({
          content: message,
          image: await Promise.all(image.map(uploadFile)),
          userID: user.attributes.sub,
          chatroomID: chatRoom.id,
          replyToMessageID: messageReplyTo?.id,
        })
      );
      updateLastMessage(newMessage);
      resetFields();
    } else if (soundURI) {
      sendAudio();
    } else if (message) {
      onSendPress();
    } else {
      onMicrophonePress();
    }
  };

  const resetFields = () => {
    setMessage("");
    setIsEmojiOpen(false);
    setImage([]);
    setProgress(0);
    setSoundURI(null);
    removeMessageReplyTo();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      if (result.selected) {
        // user selected multiple images
        setImage(result.selected.map((asset) => asset.uri));
      } else {
        setImage([result.uri]);
      }
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

  const progressCallback = async (progress) => {
    setProgress(progress.loaded / progress.total);
  };

  const uploadFile = async (fileUri) => {
    if (!image) {
      return;
    }
    try {
      const blob = await getBlob(fileUri);
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        progressCallback,
      });
      return key;
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  const getBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  //Audio

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }
    console.log("Stopping recording..");
    setRecording(null);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    if (!uri) {
      return;
    }

    setSoundURI(uri);
  }

  const sendAudio = async () => {
    if (!soundURI) {
      return;
    }
    const uriParts = soundURI.split(".");
    const extension = uriParts[uriParts.length - 1];
    const blob = await getBlob(soundURI);
    const { key } = await Storage.put(`${uuidv4()}.${extension}`, blob, {
      progressCallback,
    });

    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        audio: key,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
        status: "SENT",
        replyToMessageID: messageReplyTo?.id,
      })
    );

    updateLastMessage(newMessage);
    resetFields();
  };

  return (
    <View style={[styles.row, { height: isEmojiOpen ? "67%" : "auto" }]}>
      {image.length > 0 && (
        <View style={styles.attachmentsContainer}>
          <FlatList
            data={image}
            horizontal
            renderItem={({ item }) => (
              <>
                <Image source={{ uri: item }} style={styles.selectedImage} />
                {/* <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignSelf: "flex-end",
            }}
          >
            <View
              style={{
                height: 5,
                borderRadius: 5,
                backgroundColor: Colors.light.tint,
                width: `${progress * 100}%`,
              }}
            ></View>
          </View> */}

                {/* <Pressable>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => setImage(null)}
              style={styles.removeSelectedImage}
            />
          </Pressable> */}
                <MaterialIcons
                  name="highlight-remove"
                  onPress={() =>
                    setImage((existingImages) =>
                      existingImages.filter((img) => img !== item)
                    )
                  }
                  size={22}
                  color="gray"
                  style={styles.removeSelectedImage}
                />
              </>
            )}
          />
        </View>
      )}

      {messageReplyTo && (
        <View
          style={{
            backgroundColor: "lightgray",
            flexDirection: "row",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ margin: 5, fontSize: 14 }}>Reply to:</Text>
            <ChatMessage messages={messageReplyTo} />
          </View>
          <Pressable onPress={() => removeMessageReplyTo()}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ margin: 5 }}
            />
          </Pressable>
        </View>
      )}
      {soundURI && <AudioPlayer soundURI={soundURI} />}
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
            {message || image.length > 0 || soundURI ? (
              <MaterialIcons name="send" size={24} color="white" />
            ) : (
              <Pressable onPressIn={startRecording} onPressOut={stopRecording}>
                <FontAwesome
                  name={"microphone"}
                  size={24}
                  color={recording ? "red" : "white"}
                />
              </Pressable>
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
