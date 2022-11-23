import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
  container: {
    padding: 10,
    // width: 300, // luu y chinh box
    // marginLeft: 50, // luu y chinh box
    flexDirection: "row",
    maxWidth: "100%",
  },
  messageBox: {
    backgroundColor: "#e5e5e5",
    marginRight: 50,
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  name: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    // marginVertical: 5,
  },
  time: {
    alignSelf: "flex-end",
    color: "grey",
  },
  checkIcon: {
    alignSelf: "flex-end",
    marginLeft: 4,
  },
  // repliedBox: {
  //   padding: 10,
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   marginBottom: 5,
  //   borderColor: "lightgray",
  //   borderWidth: 1,
  // },
  imageContainer: {
    width: "47%",
    aspectRatio: 1,
    padding: 3,
  },
  image: {
    flex: 1,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default styles;
