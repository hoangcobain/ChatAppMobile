import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View } from "../Themed";
import styles from "./style";

const NewMessageButton = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("Contacts");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="message-reply-text"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default NewMessageButton;
