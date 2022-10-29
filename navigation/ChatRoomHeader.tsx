import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { DataStore, Auth } from "aws-amplify";
import { ChatRoom, ChatRoomUser, User } from "../src/models";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";

const ChatRoomHeader = ({ id }) => {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  if (!id == null) {
    return;
  }

  const fetchUsers = async () => {
    const chatRoomUsers = await (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === id)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(chatRoomUsers);

    const authUser = await Auth.currentAuthenticatedUser();
    setUser(chatRoomUsers.find((user) => user.id != authUser.attributes.sub));
  };

  const fetchChatRoom = async () => {
    DataStore.query(ChatRoom, id).then(setChatRoom);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchUsers();
    fetchChatRoom();
  }, []);

  const getLastOnLineText = () => {
    if (!user?.lastOnlineAt) {
      return null;
    }
    // if lastOnlineAt is less than 5 minutes ago show him online
    const lastOnlineDiffMS = moment().diff(moment(user?.lastOnlineAt));
    if (lastOnlineDiffMS < 5 * 60 * 1000) {
      // less than 5 minutes
      return "online";
    } else {
      return `Last seen ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };

  const getUsernames = () => {
    return allUsers.map((user) => user.name).join(", ");
  };

  const isGroup = () => {
    return allUsers.length > 2;
  };

  return (
    <View
      style={{
        backgroundColor: Colors.light.tint,
        flexDirection: "row",
        width: width - 65,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={styles.info}>
        <Image
          source={{
            uri: chatRoom?.imageUri || user?.imageUri,
          }}
          style={{ width: 35, height: 35, borderRadius: 30, marginRight: 5 }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
              flex: 1,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {chatRoom?.name || user?.name}
          </Text>
          <Text style={{ color: "white", flex: 1 }} numberOfLines={1}>
            {isGroup() ? getUsernames() : getLastOnLineText()}
          </Text>
        </View>
      </View>

      <View style={styles.icon_info}>
        <MaterialIcons
          name="call"
          size={22}
          color={"white"}
          style={styles.text_margin}
        />
        <FontAwesome5
          name="video"
          size={22}
          color={"white"}
          style={styles.text_margin}
        />
        <MaterialCommunityIcons
          name="dots-vertical"
          size={22}
          color={"white"}
          style={styles.text_margin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //   icon_header_right: {
  //     backgroundColor: Colors.light.tint,
  //     flexDirection: "row",
  //     width: 290,
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //   },
  info: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    // justifyContent: "space-between",
  },
  icon_info: {
    flexDirection: "row",
    alignItems: "center",
  },
  text_margin: {
    marginRight: 10,
  },
});

export default ChatRoomHeader;
