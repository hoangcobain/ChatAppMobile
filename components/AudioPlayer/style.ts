import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 3,
    backgroundColor: "white",
  },

  audioProgressBG: {
    margin: 11,
    height: 3,
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "lightgray",
    borderRadius: 5,
  },

  audioProgressFG: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
    position: "absolute",
    top: -4,
  },
});

export default styles;
