import { StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Platform } from "react-native";
import { pallet } from "./utils";

const { isPad } = Platform;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0,
  },
  info: {
    marginTop: isIphoneX() ? "10%" : (isPad ? "6%" : "8%"),
    marginRight: "2%",
    marginBottom: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  probability: {
    color: pallet.textColor,
    fontSize: 18
  },
  textInput: {
    width: "90%",
    fontSize: isPad ? 72 : 46,
    marginLeft: "5%",
    marginRight: "5%",
    alignSelf: "stretch",
  }
});

export default styles;
