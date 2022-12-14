import { StyleSheet, FlatList } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import ChatListItem from "../components/ChatListItem";
// import chatRooms from "../data/ChatRooms";
import NewMessageButton from "../components/NewMessageButton";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser } from "../src/models";
import React, { useState, useEffect } from "react";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChatRooms = async () => {
    setLoading(true);
    const userData = await Auth.currentAuthenticatedUser();
    const chatRooms = (await DataStore.query(ChatRoomUser))
      .filter(
        (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
      )
      .map((chatRoomUser) => chatRoomUser.chatRoom);

    // console.log(chatRooms);
    const sortedRooms = chatRooms.sort(
      (r1, r2) => new Date(r2.updatedAt) - new Date(r1.updatedAt)
    );

    setChatRooms(sortedRooms);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        style={{ width: "100%" }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchChatRooms}
      />
      {/* <ChatListItem chatRoom={chatRooms[0]} /> */}
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
