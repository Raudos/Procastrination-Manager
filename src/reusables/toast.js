import { ToastAndroid } from "react-native";

export default string => {
  ToastAndroid.show(string, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
};
