import { doc } from 'firebase/firestore';
import { View, Text, StyleSheet, TextInput,TouchableOpacity,ActivityIndicator} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./firebase.config/firebase";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";
// import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { setDoc } from "firebase/firestore";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isModal, setIsModal] = useState(false);
  // const [image, setImage] = useState('');

  const handleSignup = () => {
    if (email != "" && password != "") {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const uid = userCredential.user.uid;
          Toast.show({
            type: "success",
            text1: "Login successfully",
            text2: "happy shoping",
          });
          setDoc(doc(db, "users", uid), {
            email,
            uid,
          });
          console.log("signup -> uid", uid);
          var saveUId = await AsyncStorage.setItem("uid", uid);
          console.log("🚀saveUId:from signup ", saveUId);
          setLoading(false);
          setEmail("");
          setPassword("");
          router.push("main");
        })
        .catch((error) => {
          alert(error.message);
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
  // async function handleCamera() {
  //    setIsModal(false);
  //    let res = await ImagePicker.requestCameraPermissionsAsync();
  //    if (res.granted) {
 
  //      let result = await ImagePicker.launchCameraAsync();
  //      if (!result.canceled) {
  //        console.log(result.assets[0].uri);
  //        setImage(result.assets[0].uri);
  //        await handleUpload(result.assets[0].uri);
  //      }
 
  //    } else {
  //      showToast("error", "Error", "Permission to access the camera is required!");
  //    }
  //  }
  //  async function handleUpload(params) {
  //   console.log("🚀 ~ handleUpload ~ params:", params)
    
  //  }
   
  return (
    <View style={styles.container}>
      <StatusBar style="black" />
      <View style={styles.textView}>
        <Text style={styles.text}>Create an</Text>
        <Text style={styles.text}>account</Text>
        <Toast />
      </View>
      <View style={styles.main}>
        <View style={styles.Innerbox}>
          <AntDesign name="mail" size={32} color="black" />
          <TextInput
            placeholder="Enter email"
            style={styles.input1}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.Innerbox}>
          <Feather name="unlock" size={30} color="black" />
          <TextInput
            placeholder="Enter password"
            style={styles.input1}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity onPress={handleSignup} style={styles.btn}>
          {loading ? (
            <ActivityIndicator size={40} color={"white"} />
          ) : (
            <Text style={styles.innerBtn}>Create account</Text>
          )}
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>or continue with</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/google.png")}
            style={{ height: hp("7%"), width: wp("13%") }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 15 }}>
          Already have an account
          <Text
            style={{ color: "#2e7dab" }}
            onPress={() => router.push("login")}
          >
            Login
          </Text>
        </Text>
     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Modalcontainer:{
    height:hp("100%"),
    width:wp("100%"),
    backgroundColor:'lightgrey',
    justifyContent:'center',
  
  },
  buttons: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F83758',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 15,


  },
  btnBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
   justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    gap: 20,
  },
  btnText: {
    fontFamily: 'serif',
    color: 'white'

  },
  forgetContainer: {
    width: wp("80%"),
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  img:{
    height:hp("15%"),
    width:wp("30%"),
    borderRadius:100
  },
  innerBtn: {
    fontSize: 20,
    color: "white",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
  },
  input1: {
    height: hp("6%"),
    width: wp("72%"),
    fontSize: 20,
    marginLeft: 4,
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
  imgcamera:{
    height:hp("5%"),
    width:wp("10%"),
    position:'absolute',
    bottom:0,
    right:0,
    borderRadius:100
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
  Innerbox: {
    backgroundColor: "lightgrey",
    height: hp("7%"),
    width: wp("90%"),
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 30,
    paddingLeft: 10,
    gap:5
  },
});
export default Signup;
