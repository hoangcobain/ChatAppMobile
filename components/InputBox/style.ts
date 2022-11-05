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
  row: {
    flexDirection: "column",
  },
  // imageContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   margin: 5,
  //   padding: 5,
  //   borderWidth: 1,
  //   borderColor: "lightgray",
  //   borderRadius: 3,
  // },
  attachmentsContainer: {
    alignItems: "flex-start",
  },
  selectedImage: {
    height: 100,
    width: 200,
    margin: 5,
    borderRadius: 4,
  },
  removeSelectedImage: {
    position: "absolute",
    right: 157,
    top: 6,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default styles;
