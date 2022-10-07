import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 25,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default styles;
