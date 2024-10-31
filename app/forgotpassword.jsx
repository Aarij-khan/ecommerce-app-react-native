import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { auth } from "./firebase.config/firebase";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import Toast from "react-native-toast-message";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
const Forgotpassword = () => {
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = () => {
    if (Email != "") {
      setLoading(true);
      sendPasswordResetEmail(auth, Email)
        .then(() => {
          router.push("login");
          setLoading(false);
          Toast.show({
            type: "success",
            text1: "Request successfull!",
            text2: "Please check your email",
          });
        })
        .catch((e) => {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Something went wrong!",
            text2: e.code || e.message,
          });
        });
    }
  };
  return (
    <View>
      <Toast />
      <StatusBar style="black" />
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>Forgot</Text>
          <Text style={styles.text}>Password!</Text>
        </View>

        <View style={styles.main}>
          <TextInput
            placeholder="Enter email"
            value={Email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <TouchableOpacity onPress={handleSendEmail} style={styles.btn}>
            {loading ? (
              <ActivityIndicator size={40} color={"white"} />
            ) : (
              <Text style={styles.innerBtn}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgetContainer: {
    width: wp("80%"),
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  innerBtn: {
    fontSize: 20,
    color: "white",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
  },
  input: {
    height: hp("7%"),
    width: wp("80%"),
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    fontSize: 17,
    color: "black",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
    marginLeft: 20,
    fontFamily: "serif",
  },
  textView: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  btn: {
    height: hp("7%"),
    width: wp("80%"),
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F83758",
    justifyContent: "center",
    alignItems: "center",
  },
  forget: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
    marginLeft: 20,
  },
});
export default Forgotpassword;
