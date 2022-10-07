import {
  FlatList,
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from "react-native";
import React from "react";
import chatRoomData from "../data/Chats";

import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";

const ChatRoomScreen = () => {
  const route = useRoute();
  // console.log(route.params);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <ChatMessage messages={item} />}
        inverted
      />
      <InputBox />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatRoomScreen;
