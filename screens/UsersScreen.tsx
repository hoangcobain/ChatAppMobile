import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
// import users from "../data/Users";
import UserListItem from "../components/UserListItem";
import NewGroupButton from "../components/NewGroupButton";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../src/models";
import Colors from "../constants/Colors";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isNewGroup, setIsNewGroup] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  });

  const addUserToChatRoom = async (user, chatRoom) => {
    DataStore.save(
      new ChatRoomUser({
        user,
        chatRoom,
      })
    );
  };

  //navigation to chat room with this user
  const createChatRoom = async (users) => {
    // if there is already a chat room with these users, then redirect to the existed chatroom
    //otherwise  create a new chat room for these users

    //connect authenticated user with chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);

    //Create a chat room
    const newChatRoomData = {
      newMessages: 0,
      Admin: dbUser,
    };
    if (users.length > 1) {
      newChatRoomData.name = "New group";
      newChatRoomData.imageUri =
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/group.jpeg";
    }
    const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));

    if (dbUser) {
      await addUserToChatRoom(dbUser, newChatRoom);
    }

    //connect click user with chat room
    await Promise.all(
      users.map((user) => addUserToChatRoom(user, newChatRoom))
    );

    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };

  const isUserSelected = (user) => {
    return selectedUsers.some((selectedUsers) => selectedUsers.id === user.id);
  };

  const onUserPress = async (user) => {
    if (isNewGroup) {
      if (isUserSelected(user)) {
        setSelectedUsers(
          selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        );
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      await createChatRoom([user]);
    }
  };

  const saveGroup = async () => {
    await createChatRoom(selectedUsers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        nestedScrollEnabled
        style={{ width: "100%" }}
        data={users}
        renderItem={({ item }) => (
          <UserListItem
            user={item}
            onPress={() => onUserPress(item)}
            isSelected={isNewGroup ? isUserSelected(item) : undefined}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <NewGroupButton onPress={() => setIsNewGroup(!isNewGroup)} />
        )}
      />

      {isNewGroup && (
        <Pressable style={styles.button} onPress={saveGroup}>
          <Text style={styles.buttonText}>
            Save group ({selectedUsers.length})
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 22,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.light.tint,
    marginHorizontal: 10,
    padding: 15,
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
