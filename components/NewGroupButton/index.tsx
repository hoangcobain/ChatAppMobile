import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const NewGroupButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.groupContainer}>
        <FontAwesome name="group" size={24} color="#4f4f4f" />
        <Text style={styles.groupText}>New group</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  groupText: {
    marginLeft: 10,
    fontWeight: "bold",
    color: "#4f4f4f",
  },
});
export default NewGroupButton;
