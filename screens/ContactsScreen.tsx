import { StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { DataStore } from "@aws-amplify/datastore";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
// import users from "../data/Users";
import ContactListItem from "../components/ContactListItem";
import { User } from "../src/models";
import { Auth } from "aws-amplify";

export default function Contacts() {
  const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   DataStore.query(User).then(setUsers);
  // });

  useEffect(() => {
    const fectchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const fectchUsers = await DataStore.query(User);
      setUsers(
        fectchUsers.filter((user) => user.id !== authUser.attributes.sub)
      );
    };
    fectchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        style={{ width: "100%" }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 22,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
