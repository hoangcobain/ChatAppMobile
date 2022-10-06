import { StyleSheet, FlatList } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import ChatListItem from "../components/ChatListItem";
import chatRooms from "../data/ChatRooms";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        style={{ width: "100%" }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* <ChatListItem chatRoom={chatRooms[0]} /> */}
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
