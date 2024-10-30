import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { auth } from "./firebase.config/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (email && password != "") {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const uid = userCredential.user.uid;
          console.log("signup -> uid", uid);
          var saveUId = await AsyncStorage.setItem("uid", uid);
          console.log("🚀saveUId:from signup ", saveUId);
          setLoading(false);
          setEmail("");
          setPassword("");
          //   navigation.navigate("Main");
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <View styles={styles.main}>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        styles={styles.input}
      />
      <TextInput
        placeholder="Enter password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        styles={styles.input}
      />
      <TouchableOpacity onPress={handleSignup} styles={styles.btn}>
        {loading ? (
          <ActivityIndicator size={50} color={white} />
        ) : (
          <Text>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Signup;
