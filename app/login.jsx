import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./firebase.config/firebase";
import { router, useFocusEffect } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";
import { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email && password != "") {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const uid = userCredential.user.uid;
          await AsyncStorage.setItem("uid", uid);
          console.log("TCL: handleLogin -> uid", uid);
          setLoading(false);
          setEmail("");
          setPassword("");
          router.push("main");
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Something went wrong!",
            text2: error.message,
          });
          setLoading(false);
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: "Please fill all the fields",
      });
    }
  };



  return (
    <>
      <View style={styles.container}>
      <StatusBar style="black" />
        <View style={styles.textView}>
          <Text style={styles.text}>Welcome</Text>
          <Text style={styles.text}>Back!</Text>
          <Toast />
        </View>

        <View style={styles.main}>
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          <View style={styles.forgetContainer}>
            <Text style={styles.forget} onPress={()=>router.push('forgotpassword')}>Forgot password?</Text>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.btn}>
            {loading ? (
              <ActivityIndicator size={40} color={"white"} />
            ) : (
              <Text style={styles.innerBtn}>Login</Text>
            )}
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            or continue with
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../assets/google.png")}
              style={{ height: hp("7%"), width: wp("13%") }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 15 }}>
            Create an account{" "}
            <Text
              style={{ color: "#2e7dab" }}
              onPress={() => router.push("signup")}
            >
              Signup
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
export default Login;
