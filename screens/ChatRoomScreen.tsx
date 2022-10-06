import { FlatList, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import chatRoomData from "../data/Chats";

import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessage";

const ChatRoomScreen = () => {
  const route = useRoute();
  // console.log(route.params);

  return (
    // <ImageBackground source={}>
    <FlatList
      data={chatRoomData.messages}
      renderItem={({ item }) => <ChatMessage messages={item} />}
      inverted
    />
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default ChatRoomScreen;
