import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../src/models";

const StatusUserScreen = () => {
  const route = useRoute();
  const [inputStatus, setInputStatus] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigation = useNavigation();

  const onSave = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const original = await DataStore.query(User, user.attributes.sub);
    const newUserStatus = await DataStore.save(
      User.copyOf(original, (updated) => {
        updated.status = inputStatus;
      })
    );
    setUser(newUserStatus);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStatus}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setInputStatus(text)}
        value={inputStatus}
      ></TextInput>
      <Text style={styles.button} onPress={onSave}>
        Save
      </Text>
    </View>
  );
};

export default StatusUserScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    height: "100%",
    backgroundColor: "white",
  },
  inputStatus: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "lightgray",
    width: "100%",
  },
  button: {
    backgroundColor: Colors.light.tint,
    // padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginTop: 8,
    alignSelf: "flex-end",
    color: "white",
  },
});
