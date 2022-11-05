import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ChatRoom, ChatRoomUser, User } from "../../src/models";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, Auth, DataStore, graphqlOperation } from "aws-amplify";
import UserListItem from "../../components/UserListItem";
import { onUpdateChatRoom } from "../../src/graphql/subscriptions";

const GroupInfoScreen = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    fetchUsers();
  }, [allUsers]);

  const fetchUsers = async () => {
    const chatRoomUsers = await (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === route.params?.id)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(chatRoomUsers);
  };

  const fetchedChatRoom = async () => {
    // setLoading(true);
    if (!route.params?.id) return;

    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("Coundnt find chat room with this id");
    } else {
      setChatRoom(chatRoom);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchedChatRoom();

    // Subscribe to onUpdateChatRoom
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, {
        filter: { id: { eq: route.params?.id } },
      })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (error) => console.warn(error),
    });

    // Stop receiving data updates from the subscription
    return () => subscription.unsubscribe();
  }, [route.params?.id]);

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
      <View style={styles.textPaticipants}>
        <Text style={styles.title}>Participants ({allUsers.length})</Text>
        <Text
          style={{ fontWeight: "bold", color: "royalblue" }}
          onPress={() =>
            navigation.navigate("AddContactsToGroupScreen", { chatRoom })
          }
        >
          Invite friends
        </Text>
      </View>

      <FlatList
        data={allUsers}
        renderItem={({ item }) => (
          <UserListItem
            user={item}
            isAdmin={chatRoom?.Admin?.id === item.id}
            onLongPress={() => confirmDelete(item)}
          />
        )}
        onRefresh={fetchedChatRoom}
        refreshing={loading}
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
  textPaticipants: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default GroupInfoScreen;
