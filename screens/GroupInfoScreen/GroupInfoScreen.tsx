import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ChatRoom, ChatRoomUser, User } from "../../src/models";
import { useRoute } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import UserListItem from "../../components/UserListItem";

const GroupInfoScreen = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const route = useRoute();

  useEffect(() => {
    fetchedChatRoom();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const chatRoomUsers = await (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === route.params?.id)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(chatRoomUsers);
  };

  const fetchedChatRoom = async () => {
    if (!route.params?.id) return;

    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("Coundnt find chat room with this id");
    } else {
      setChatRoom(chatRoom);
    }
  };

  const confirmDelete = async (user) => {
    //check if Auth user is admin of this group
    const authData = await Auth.currentAuthenticatedUser();
    if (chatRoom?.Admin?.id !== authData.attributes.sub) {
      Alert.alert("You are not admin");
      return;
    }

    if (user.id === chatRoom?.Admin?.id) {
      Alert.alert("You are admin, can not deleting");
      return;
    }
    Alert.alert(
      "Confirm delete",
      `Are you sure you want to delete ${user.name} from the group`,
      [
        {
          text: "Yes",
          onPress: () => deleteUser(user),
          style: "destructive",
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const deleteUser = async (user) => {
    const chatRoomUsersToDelete = await (
      await DataStore.query(ChatRoomUser)
    ).filter(
      (cru) => cru.chatRoom.id === chatRoom?.id && cru.user.id === user.id
    );

    if (chatRoomUsersToDelete.length > 0) {
      await DataStore.delete(chatRoomUsersToDelete[0]);

      setAllUsers(allUsers.filter((u) => u.id !== user.id));
    }
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{chatRoom?.name}</Text>
      <Text style={styles.title}>Users ({allUsers.length})</Text>
      <FlatList
        data={allUsers}
        renderItem={({ item }) => (
          <UserListItem
            user={item}
            isAdmin={chatRoom?.Admin?.id === item.id}
            onLongPress={() => confirmDelete(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5,
  },
});

export default GroupInfoScreen;
