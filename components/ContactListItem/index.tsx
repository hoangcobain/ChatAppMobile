import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
// import { User } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../../src/models";
import { getCommonChatRoomWithUser } from "../../services/chatRoomService";

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  // console.log(user.id);

  const navigation = useNavigation();

  //navigation to chat room with this user
  const onClick = async () => {
    // if there is already a chat room with these users, then redirect to the existed chatroom
    //otherwise  create a new chat room for these users

    const existingChatRoom = await getCommonChatRoomWithUser(user.id);
    // console.log(existingChatRoom);

    if (existingChatRoom) {
      navigation.navigate("ChatRoom", { id: existingChatRoom.chatRoom.id });
      // Alert.alert("This room has created");
      return;
    }
    //Create a chat room
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    //connect authenticated user with chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    await DataStore.save(
      new ChatRoomUser({
        user: dbUser,
        chatRoom: newChatRoom,
      })
    );

    //connect click user with chat room
    await DataStore.save(
      new ChatRoomUser({
        user: user,
        chatRoom: newChatRoom,
      })
    );

    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
