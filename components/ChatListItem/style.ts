import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  badgeContainer: {
    backgroundColor: "#3777f0",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 45,
    top: 3,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  leftContainer: {
    flexDirection: "row",
  },
  midContainer: {
    justifyContent: "space-around",
    width: "60%",
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 13,
    borderRadius: 50,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: "grey",
  },
  time: {
    width: "22%",
    marginTop: 6,
    fontSize: 14,
    color: "grey",
  },
});

export default styles;
