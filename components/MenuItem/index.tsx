import React, { useState } from "react";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

import { View, Text, Pressable } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import Colors from "../../constants/Colors";
import styles from "./style";
import { Auth, DataStore } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

const MenuCustom = () => {
  const navigation = useNavigation();

  const navigateToGroup = () => {
    navigation.navigate("Users");
  };

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const logOut = () => {
    Auth.signOut();
  };

  return (
    <View style={styles.icon_search_dots}>
      <Octicons name="search" size={24} color={"white"} />
      <Menu
        style={{ marginTop: 30 }}
        visible={visible}
        anchor={
          <Pressable onPress={showMenu}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={22}
              color={"white"}
            />
          </Pressable>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={logOut}>Log out</MenuItem>
        <MenuItem onPress={navigateToGroup}>Create chat group</MenuItem>
        <MenuItem disabled>Some other tasks</MenuItem>
      </Menu>
    </View>
  );
};

export default MenuCustom;
