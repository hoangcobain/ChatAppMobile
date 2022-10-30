/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import {
  Octicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { View } from "../components/Themed";
import ContactsScreen from "../screens/ContactsScreen";
import UsersScreen from "../screens/UsersScreen";
import MenuCustom from "../components/MenuItem";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
import ChatRoomHeader from "./ChatRoomHeader";
import GroupInfoScreen from "../screens/GroupInfoScreen/GroupInfoScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          title: "ChatApp",
          headerTransparent: true,
          headerRight() {
            return (
              // <View style={styles.icon_search_dots}>
              //   <Octicons name="search" size={24} color={"white"} />
              //   <MaterialCommunityIcons
              //     name="dots-vertical"
              //     size={24}
              //     color={"white"}
              //   />
              // </View>
              <MenuCustom />
            );
          },
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: "",
          headerRight: () => <ChatRoomHeader id={route.params.id} />,
        })}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: "Contacts" }}
      />
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{ title: "Group" }}
      />
      <Stack.Screen
        name="GroupInfoScreen"
        component={GroupInfoScreen}
        options={{ title: "GroupInfoScreen" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tint,
        },
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarActiveTintColor: Colors[colorScheme].background,
        // tabBarLabelPosition: "beside-icon",
        tabBarActiveBackgroundColor: Colors[colorScheme].tint,
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 13,
        },
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={ChatScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Chat",
          tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Status",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="battery" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Call"
        component={TabTwoScreen}
        options={{
          title: "Call",
          tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Camera"
        component={TabTwoScreen}
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
