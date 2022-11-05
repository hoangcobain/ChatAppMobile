import { useActionSheet } from "@expo/react-native-action-sheet";
import { Auth, DataStore, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { User } from "../src/models";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

const UserInfoScreen = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [otherUser, setOtherUser] = useState<User | undefined>(undefined);
  // const [isMe, setIsMe] = useState<boolean | null>(null);
  // const [image, setImage] = useState(null);

  const { showActionSheetWithOptions } = useActionSheet();

  const navigation = useNavigation();
  const route = useRoute();

  // const otherUserId = route.params.id;

  // useEffect(() => {
  //   const checkIfMe = async () => {
  //     if (!user) {
  //       return;
  //     }
  //     const authUser = await Auth.currentAuthenticatedUser();
  //     setIsMe(route.params.id !== authUser.attributes.sub);
  //   };
  //   checkIfMe();
  // }, [user]);

  const openScreenUpdateStatus = () => {
    navigation.navigate("StatusUserScreen", { id: user?.id });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const user = await Auth.currentAuthenticatedUser();
      const original = await DataStore.query(User, user.attributes.sub);
      const newUserImage = await DataStore.save(
        User.copyOf(original, (updated) => {
          updated.imageUri = result.uri;
        })
      );
      setUser(newUserImage);
    }
  };

  const onActionPress = (index) => {
    if (index === 0) {
      pickImage();
    } else if (index === 1) {
      // confirmDelete();
    }
  };

  const openActionMenu = () => {
    const options = ["Change image", "Other"];

    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      onActionPress
    );
  };

  useEffect(() => {
    const fectchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const fectchUsers = await DataStore.query(User, authUser.attributes.sub);
      setUser(fectchUsers);
    };
    fectchUsers();
  }, [user]);

  useEffect(() => {
    const fectchOtherUser = async () => {
      const fectchUsers = await DataStore.query(User, route?.params.id);
      setOtherUser(fectchUsers);
    };
    fectchOtherUser();
  }, [otherUser]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab Two</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
      <View style={styles.info}>
        <ImageBackground
          source={{
            uri: route.params ? otherUser?.imageUri : user?.imageUri,
          }}
          style={styles.imageBackGroud}
          resizeMode="stretch"
        >
          <TouchableOpacity onLongPress={openActionMenu}>
            <Image
              source={{
                uri: route.params ? otherUser?.imageUri : user?.imageUri,
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.infoDetail}>
          <Text style={styles.name}>
            {route.params ? otherUser?.name : user?.name}
          </Text>
          {user?.status && (
            <Text style={styles.newStatus} numberOfLines={2}>
              {route.params ? otherUser?.status : user?.status}
            </Text>
          )}
          {!route.params && (
            <TouchableOpacity
              style={styles.updateStatus}
              onPress={openScreenUpdateStatus}
            >
              <MaterialCommunityIcons
                name="pencil-plus"
                size={18}
                color={Colors.light.tint}
              />
              <Text style={styles.status}>About yourself</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  info: {
    width: "100%",
    flex: 1,
    height: "30%",
    alignItems: "center",
  },
  infoDetail: {
    position: "absolute",
    top: "40%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    position: "relative",
    top: 110,
  },
  imageBackGroud: {
    backgroundColor: "red",
    width: "100%",
    alignItems: "center",
    height: 170,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  updateStatus: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    color: Colors.light.tint,
    fontSize: 15,
  },
  newStatus: {
    fontSize: 18,
    fontWeight: "650",
    marginTop: 5,
  },
});
