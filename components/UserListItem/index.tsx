import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { User } from "../../src/models";
// import { User } from "../../types";
import styles from "./style";

const UserListItem = ({ user, onPress, isSelected }) => {
  // const { user } = props;

  // console.log(user);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
        {isSelected !== undefined && (
          <Feather
            name={isSelected ? "check-circle" : "circle"}
            size={20}
            color="#4f4f4f"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserListItem;
