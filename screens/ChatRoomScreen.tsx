import {
  FlatList,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
// import chatRoomData from "../data/Chats";

import { useRoute } from "@react-navigation/native";
import { DataStore, SortDirection } from "aws-amplify";
import { Message, ChatRoom } from "../src/models";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);

  const route = useRoute();
  // console.log(route.params);

  useEffect(() => {
    fetchedChatRoom();
  }, []);

  useEffect(() => {
    fetchedMessages();
  }, [chatRoom]);

  const fetchedChatRoom = async () => {
    if (!route.params?.id) return;

    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("Coundnt find chat room with this id");
    } else {
      setChatRoom(chatRoom);
    }
  };

  const fetchedMessages = async () => {
    if (!chatRoom) {
      return;
    }
    const fetchedMessages = await DataStore.query(
      Message,
      (message) => message.chatroomID("eq", chatRoom?.id),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    setMessages(fetchedMessages);
  };
  if (!chatRoom) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage messages={item} />}
        inverted
      />
      <InputBox chatRoom={chatRoom} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatRoomScreen;
