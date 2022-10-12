import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoomUser, Message, User } from "../../src/models";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  // const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [lastMessage, setLastMessage] = useState<Message | undefined>(
    undefined
  );
  const { chatRoom } = props;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const chatRoomUsers = await (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);

      // setUsers(chatRoomUsers);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(chatRoomUsers.find((user) => user.id != authUser.attributes.sub));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!chatRoom.chatRoomLastMessageId) {
      return;
    }
    DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(
      setLastMessage
    );
  }, []);

  // const user = chatRoom.users[1];
  // console.log(user);

  if (!user) {
    return <ActivityIndicator />;
  }

  const onClick = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id, name: user.name });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          {!!chatRoom.newMessages && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
            </View>
          )}
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            {!chatRoom.lastMessage && (
              <Text style={styles.lastMessage} numberOfLines={1}>
                {lastMessage?.content}
              </Text>
            )}
          </View>
        </View>
        <Text style={styles.time}>
          {moment(lastMessage?.createdAt).fromNow()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
