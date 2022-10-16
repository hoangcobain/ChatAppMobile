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
import { ChatRoomUser, User } from "../src/models";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const ChatRoomHeader = ({ id }) => {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState<User | null>(null);
  if (!id == null) {
    return;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const chatRoomUsers = await (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === id)
        .map((chatRoomUser) => chatRoomUser.user);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(chatRoomUsers.find((user) => user.id != authUser.attributes.sub));
    };
    fetchUsers();
  }, []);
  return (
    <View
      style={{
        backgroundColor: Colors.light.tint,
        flexDirection: "row",
        width: width - 70,
        justifyContent: "space-between",
        alignItems: "center",
        // flex: 1,
      }}
    >
      <View style={styles.info}>
        <Image
          source={{ uri: user?.imageUri }}
          style={{ width: 35, height: 35, borderRadius: 30, marginRight: 5 }}
        />
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {user?.name}
        </Text>
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
