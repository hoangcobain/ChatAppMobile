import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
// import users from "../data/Users";
import UserListItem from "../components/UserListItem";
import NewGroupButton from "../components/NewGroupButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, Auth, DataStore, graphqlOperation, input } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../src/models";
import Colors from "../constants/Colors";
import InputBox from "../components/InputBox";
import { listUsers } from "../src/graphql/queries";

export default function AddContactsToGroupScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const navigation = useNavigation();

  const route = useRoute();
  const chatRoom = route.params.chatRoom;
  // const allUser = route.params.allUsers;

  // useEffect(() => {
  //   setAllUsers(allUser);
  // }, [allUsers]);

  // console.log(chatRoom);
  // console.log("allUser:", JSON.stringify(allUser, null, 2));

  useEffect(() => {
    const fectchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const chatRoomUsers = await (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUsers) =>
            chatRoomUsers.chatRoom.id !== chatRoom.id &&
            chatRoomUsers.user.id !== authUser.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.user);

      // console.log("chatRoomUser:", JSON.stringify(chatRoomUsers, null, 2));

      setUsers(chatRoomUsers);
    };
    fectchUsers();
  }, [chatRoom.id]);

  const addUserToChatRoom = async (user, chatRoom) => {
    DataStore.save(
      new ChatRoomUser({
        user,
        chatRoom,
      })
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add to group"
          disabled={selectedUsers.length < 1}
          onPress={saveGroup}
        />
      ),
    });
  }, [selectedUsers]);

  //navigation to chat room with this user
  const onAddToGroupPress = async (users) => {
    //connect click user with chat room
    await Promise.all(users.map((user) => addUserToChatRoom(user, chatRoom)));

    setSelectedUsers([]);
    navigation.goBack();
  };

  const isUserSelected = (user) => {
    return selectedUsers.some((selectedUsers) => selectedUsers.id === user.id);
  };

  const onUserPress = async (user) => {
    if (isUserSelected(user)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const saveGroup = async () => {
    await onAddToGroupPress(selectedUsers);
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
            isSelected={isUserSelected(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {/* <Pressable
        style={styles.button}
        onPress={saveGroup}
        disabled={selectedUsers.length < 1}
      >
        <Text style={styles.buttonText}>
          Add to group ({selectedUsers.length})
        </Text>
      </Pressable> */}
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
  viewNameGroup: {
    width: "95%",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputNameGroup: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "lightgray",
    width: "100%",
    flex: 1,
  },
});
